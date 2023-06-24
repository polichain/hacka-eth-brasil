// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Asset} from "./Asset.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract SupplyChains {
    using Counters for Counters.Counter;

    Asset public immutable assetContract;

    struct Company {
        string name;
        string description;
        string documentNumber;
        string location;
        string category;
    }

    mapping (address => Company) public companies;

    mapping (uint256 => Asset.TransferData) transferProposalsByID;
    mapping (uint256 => mapping (address => uint256)) transferProposalsByAssetIdAndOfferedAddress;
    Counters.Counter private _transferIdCounter;

    event OfferAsset(Asset.TransferData _transfer, uint256 indexed _assetId);

    event AcceptAsset(Asset.TransferData _transfer, uint256 indexed _assetId);

    constructor(address _assetContract) {
        assetContract = Asset(_assetContract);
    }

    function createAsset(string memory description) public {
        assetContract.safeMint(description, msg.sender);
    }

    function offerAsset(address to, uint256 assetId) public {
        require(assetContract.ownerOf(assetId) == msg.sender, "Only the owner can offer the asset");
        require(transferProposalsByAssetIdAndOfferedAddress[assetId][to] == 0, "Offer already made");
        Asset.TransferData memory transferOffer = Asset.TransferData(msg.sender, to, block.timestamp);
        uint256 transferId = _transferIdCounter.current();
        transferProposalsByID[transferId] = transferOffer;
        transferProposalsByAssetIdAndOfferedAddress[assetId][to] = transferId;
        _transferIdCounter.increment();
        emit OfferAsset(transferOffer, assetId);
    }

    function acceptAsset(uint256 assetId) public {
        require(transferProposalsByAssetIdAndOfferedAddress[assetId][msg.sender] != 0, "Offer doesn't exist");
        Asset.TransferData memory transferOffer = transferProposalsByID[transferProposalsByAssetIdAndOfferedAddress[assetId][msg.sender]];
        transferOffer.timestamp = block.timestamp;
        assetContract.pushTransfertIntoAsset(transferOffer, assetId);
        uint256 transferId = transferProposalsByAssetIdAndOfferedAddress[assetId][msg.sender];
        delete transferProposalsByID[transferId];
        delete transferProposalsByAssetIdAndOfferedAddress[assetId][msg.sender];
        assetContract.getAdminApproved(assetId);
        assetContract.transferFrom(transferOffer.from, transferOffer.to, assetId);
        emit AcceptAsset(transferOffer, assetId);
    }

    function getAssetTransactionList(uint256 assetId) public view returns (Asset.TransferData[] memory) {
        return assetContract.getTransfersFromAssetId(assetId);
    }

    function addCompany(
        string memory name,
        string memory description,
        string memory documentNumber,
        string memory location,
        string memory category
    ) public {
        companies[msg.sender] = Company(name, description, documentNumber, location, category);
    }

    function updateCompany(
        string memory name,
        string memory description,
        string memory documentNumber,
        string memory location,
        string memory category
    ) public {
        require(bytes(companies[msg.sender].name).length != 0, "Company does not exist");
        companies[msg.sender] = Company(name, description, documentNumber, location, category);
    }

    function getCompany(address companyAddress) public view returns (Company memory) {
        return companies[companyAddress];
    }
}
