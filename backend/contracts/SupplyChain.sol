// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Asset} from "./Asset.sol";
import {Plataform} from "./Plataform.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {Utils} from './Utils.sol';

contract SupplyChain is Ownable {
    using Counters for Counters.Counter;

    Asset private immutable assetContract;
    Plataform private immutable plataformContract;

    mapping(uint256 => Utils.Suggestion) suggestions;
    mapping(uint256 => mapping(address => bool)) suggestionsVotes;
    Counters.Counter private _suggestionIdCounter;

    mapping(uint256 => Utils.TransferData) transferProposalsByID;
    mapping(uint256 => mapping(address => uint256)) transferProposalsByAssetIdAndOfferedAddress;
    Counters.Counter private _transferIdCounter;

    mapping(address => bool) public invites;

    event OfferAsset(Utils.TransferData _transfer, uint256 indexed _assetId);
    event AcceptAsset(Utils.TransferData _transfer, uint256 indexed _assetId);

    string public name;
    string public description;
    address[] public members;
    uint256 id;

    constructor(string memory _name, string memory _description, Plataform _plataform, uint256 _id, address createdBy) {
        assetContract = new Asset();
        name = _name;
        description = _description;
        members.push(createdBy);
        plataformContract = _plataform;
        id = _id;
    }

    function createAsset(string memory _description, address to) public onlyOwner {
        require(isMember(to), "You're not a member");
        assetContract.safeMint(_description, to);
    }

    function offerAsset(address from, address to, uint256 assetId) public onlyOwner {
        require(isMember(from), "You're not a member");
        require(assetContract.ownerOf(assetId) == from, "Only the owner can offer the asset");
        require(transferProposalsByAssetIdAndOfferedAddress[assetId][to] == 0, "Offer already made");
        Utils.TransferData memory transferOffer = Utils.TransferData(from, to, block.timestamp);
        uint256 transferId = _transferIdCounter.current();
        transferProposalsByID[transferId] = transferOffer;
        transferProposalsByAssetIdAndOfferedAddress[assetId][to] = transferId;
        _transferIdCounter.increment();
        emit OfferAsset(transferOffer, assetId);
    }

    function acceptAsset(address member, uint256 assetId) public onlyOwner {
        require(isMember(member), "You're not a member");
        uint256 transferId = transferProposalsByAssetIdAndOfferedAddress[assetId][member];
        require(transferId != 0, "Offer doesn't exist");
        Utils.TransferData memory transferOffer = transferProposalsByID[transferId];
        transferOffer.timestamp = block.timestamp;
        assetContract.pushTransferIntoAsset(transferOffer, assetId);
        delete transferProposalsByID[transferId];
        delete transferProposalsByAssetIdAndOfferedAddress[assetId][member];
        assetContract.getAdminApproved(assetId);
        assetContract.transferFrom(transferOffer.from, transferOffer.to, assetId);
        emit AcceptAsset(transferOffer, assetId);
    }

    function getAssetTransactionList(uint256 assetId) public view onlyOwner returns (Utils.TransferData[] memory) {
        return assetContract.getTransfersFromAssetId(assetId);
    }

    function removeMember(address member) public onlyOwner {
        _removeMember(member);
    }

    function _removeMember(address member) private {
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == member) {
                if (i < members.length - 1) {
                    members[i] = members[members.length - 1];
                }
                members.pop();
                invites[member] = false;
                plataformContract.revokeSupplyChain(member, id);
                return;
            }
        }
    }

    function _createInvite(address newMember) public {
        require(msg.sender == address(this), "Forbiden.");
        invites[newMember] = true;
    }

    function enterSupplyChain(address member) public onlyOwner {
        require(invites[member], "You're not allowed to enter");
        members.push(member);
    }

    function getSuggestions() public view onlyOwner returns (Utils.Suggestion[] memory) {
        Utils.Suggestion[] memory suggestionsList = new Utils.Suggestion[](_suggestionIdCounter.current());
        for (uint256 i = 0; i < _suggestionIdCounter.current(); i++) {
            suggestionsList[i] = suggestions[i];
        }
        return suggestionsList;
    }

    function _setName(string calldata _name) public {
        require(msg.sender == address(this), "Forbiden.");
        name = _name;
    }

    function _setDescription(string calldata _description) public {
        require(msg.sender == address(this), "Forbiden.");
        description = _description;
    }

    function makeSuggestion(address sender, Utils.SuggestionType _suggestionType, bytes calldata functionParameter) public onlyOwner returns (uint256) {
        require(isMember(sender), "You're not a member!");
        bytes memory _encodedCalldata;
        if (_suggestionType == Utils.SuggestionType.CHANGE_NAME) {
            string memory parameterString = abi.decode(functionParameter, (string));
            _encodedCalldata = abi.encodeWithSignature("_setName(string)", parameterString);
        } else if (_suggestionType == Utils.SuggestionType.CHANGE_DESCRIPTION) {
            string memory parameterString = abi.decode(functionParameter, (string));
            _encodedCalldata = abi.encodeWithSignature("_setDescription(string)", parameterString);
        } else if (_suggestionType == Utils.SuggestionType.ADD_MEMBER) {
            address parameterAddress = abi.decode(functionParameter, (address));
            _encodedCalldata = abi.encodeWithSignature("_createInvite(address)", parameterAddress);
        } else if (_suggestionType == Utils.SuggestionType.REMOVE_MEMBER) {
            address parameterAddress = abi.decode(functionParameter, (address));
            _encodedCalldata = abi.encodeWithSignature("_removeMember(address)", parameterAddress);
        }
        uint256 suggestionid = _suggestionIdCounter.current();
        suggestions[suggestionid] = Utils.Suggestion(_suggestionType, _encodedCalldata, true, false, 0);
        _suggestionIdCounter.increment();
        return suggestionid;
    }

    function voteForSuggestion(address member, uint256 suggestionId, bool vote) public onlyOwner {
        require(isMember(member), "You're not a member");
        Utils.Suggestion storage suggestion = suggestions[suggestionId];
        require(suggestion.isOpen, "Suggestion is closed");
        require(!suggestionsVotes[suggestionId][member], "Already voted");

        suggestionsVotes[suggestionId][member] = vote;
        suggestion.isOpen = vote;
        suggestion.voteCount += 1;

        if (suggestion.voteCount == members.length) {
            suggestion.isOpen = false;
            suggestion.sucedded = true;
            (bool success, ) = address(this).call(suggestion.encodedCalldata);
            require(success, "Failed to execute suggestion");
        }
    }

    function isMember(address company) private view returns (bool) {
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == company) {
                return true;
            }
        }
        return false;
    }

    function getSupplyChainId() public view returns (uint256) {
        return id;
    }
}
