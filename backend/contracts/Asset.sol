// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Asset is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _assetIdCounter;

    struct TransferData {
        address from;
        address to;
        uint256 timestamp;
    }

    struct AssetData {
        string description;
        uint256 createdAt;
        mapping(uint256 => TransferData) transactions;
        uint256 transactionsCount;
    }

    mapping (uint256 => AssetData) public assets;

    constructor() ERC721("Asset", "AST") {}

    function safeMint(string memory description, address to) public {
        uint256 assetId = _assetIdCounter.current();
        _assetIdCounter.increment();
        _safeMint(to, assetId);
        AssetData storage asset = assets[assetId];
        asset.description = description;
        asset.createdAt = block.timestamp;
        asset.transactionsCount = 0;
    }

    function getAdminApproved(uint256 tokenId) public onlyOwner {
        _approve(owner(), tokenId);
    }

    function pushTransfertIntoAsset(TransferData memory transfer, uint256 tokenId) public onlyOwner {
        AssetData storage asset = assets[tokenId];
        uint256 index = asset.transactionsCount;
        asset.transactions[index] = transfer;
        asset.transactionsCount++;
    }

    function getTransfersFromAssetId(uint256 tokenId) public view returns (TransferData[] memory) {
        AssetData storage asset = assets[tokenId];
        TransferData[] memory transfers = new TransferData[](asset.transactionsCount);
        for (uint256 i = 0; i < asset.transactionsCount; i++) {
            transfers[i] = asset.transactions[i];
        }
        return transfers;
    }
}
