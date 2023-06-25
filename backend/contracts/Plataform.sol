// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
pragma experimental ABIEncoderV2;

import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {SupplyChain} from "./SupplyChain.sol";
import {Utils} from './Utils.sol';

contract Plataform {
    using Counters for Counters.Counter;

    mapping (address => Utils.Company) public companies;
    mapping (uint256 => SupplyChain) public supplyChains;
    Counters.Counter private _supplyChainsIdCounter;

    function addCompany(
        string memory name,
        string memory documentNumber
    ) public {
        uint256[] memory _supplyChainsParticipant;
        uint256[] memory _invitesToSupplyChain;
        companies[msg.sender] = Utils.Company(name, documentNumber, _supplyChainsParticipant, _invitesToSupplyChain);
    }

    function getCompany(address companyAddress) public view returns (Utils.Company memory) {
        return companies[companyAddress];
    }

    function createSupplyChain(string memory name, string memory description) public {
        _supplyChainsIdCounter.increment();
        uint256 _supplyChainId = _supplyChainsIdCounter.current();
        SupplyChain newSupplyChain = new SupplyChain(name, description, this, _supplyChainId, msg.sender);
        supplyChains[_supplyChainId] = newSupplyChain;
        companies[msg.sender].supplyChainsParticipant.push(_supplyChainId);
    }

    function getSupplyChainsParticipant() public view returns (uint256[] memory) {
        return companies[msg.sender].supplyChainsParticipant;
    }

    function getSupplyChain(uint256 supplyChainId) public view returns (SupplyChain) {
        return supplyChains[supplyChainId];
    }

    function isMemberOf(address company, uint256 supplyChainId) private view returns (bool) {
        uint256[] storage participant = companies[company].supplyChainsParticipant;
        for (uint i = 0; i < participant.length; i++) {
            if (participant[i] == supplyChainId) {
                return true;
            }
        }
        return false;
    }

    function _revokeSupplyChain(address member, uint256 _supplyChainId) private {
        uint256[] storage participant = companies[member].supplyChainsParticipant;
        for (uint i = 0; i < participant.length; i++) {
            if (participant[i] == _supplyChainId) {
                uint256 lastIndex = participant.length - 1;
                if (i < lastIndex) {
                    participant[i] = participant[lastIndex];
                }
                participant.pop();
                return;
            }
        }
    }

    function revokeSupplyChain(address member, uint256 _supplyChainId) public {
        require(isMemberOf(member, _supplyChainId), "Company not member");
        require(SupplyChain(msg.sender).getSupplyChainId() == _supplyChainId, "Forbiden");
        _revokeSupplyChain(member, _supplyChainId);
    }

    function quitSupplyChain(uint256 supplyChainId) public {
        require(isMemberOf(msg.sender, supplyChainId), "You're not a member");
        supplyChains[supplyChainId].removeMember(msg.sender);
        _revokeSupplyChain(msg.sender, supplyChainId);
    }

    function enterSupplyChain(uint256 supplyChainId) public {
        supplyChains[supplyChainId].enterSupplyChain(msg.sender);
        companies[msg.sender].supplyChainsParticipant.push(supplyChainId);
        for (uint i = 0; i < companies[msg.sender].invitesToSupplyChain.length; i++) {
            if (companies[msg.sender].invitesToSupplyChain[i] == supplyChainId) {
                uint256 lastIndex = companies[msg.sender].invitesToSupplyChain.length - 1;
                if (i < lastIndex) {
                    companies[msg.sender].invitesToSupplyChain[i] = companies[msg.sender].invitesToSupplyChain[lastIndex];
                }
                companies[msg.sender].invitesToSupplyChain.pop();
                return;
            }
        }

    }

    function createAsset(uint256 supplyChainId, string memory _description) public {
        supplyChains[supplyChainId].createAsset(_description, msg.sender);
    }

    function offerAsset(uint256 supplyChainId, address to, uint256 assetId) public {
        supplyChains[supplyChainId].offerAsset(msg.sender, to, assetId);
    }

    function acceptAsset(uint256 supplyChainId, uint256 assetId) public {
        supplyChains[supplyChainId].acceptAsset(msg.sender, assetId);
    }

    function getAssetTransactionList(uint256 supplyChainId, uint256 assetId) public view returns (Utils.TransferData[] memory) {
        return supplyChains[supplyChainId].getAssetTransactionList(assetId);
    }

    function getSuggestions(uint256 supplyChainId) public view returns (Utils.Suggestion[] memory) {
        return supplyChains[supplyChainId].getSuggestions();
    }

    function getInvites() public view returns (uint256[] memory) {
        return companies[msg.sender].invitesToSupplyChain;
    }

    function makeSuggestion(uint256 supplyChainId, Utils.SuggestionType suggestionType, bytes memory parameter) public {
        uint256 suggestionId = supplyChains[supplyChainId].makeSuggestion(msg.sender, suggestionType, parameter);
        voteForSuggestion(supplyChainId, suggestionId, true);
    }

    function voteForSuggestion(uint256 supplyChainId, uint256 suggestionId, bool vote) public {
        supplyChains[supplyChainId].voteForSuggestion(msg.sender, suggestionId, vote);
    }

    function addInvite(uint256 supplyChainId, address to) public {
        companies[to].invitesToSupplyChain.push(supplyChainId);
    }
}
