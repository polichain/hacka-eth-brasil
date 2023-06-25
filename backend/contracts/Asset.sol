// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {Utils} from './Utils.sol';

contract Asset is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _assetIdCounter;

    mapping (uint256 => Utils.AssetData) public assets;

    constructor() ERC721("Asset", "AST") {}

    function safeMint(string memory description, address to) public onlyOwner {
        _assetIdCounter.increment();
        uint256 assetId = _assetIdCounter.current();
        _safeMint(to, assetId);
        Utils.AssetData storage asset = assets[assetId];
        asset.description = description;
        asset.createdAt = block.timestamp;
        asset.transactionsCount = 0;
    }

    function getAdminApproved(uint256 tokenId) public onlyOwner {
        _approve(owner(), tokenId);
    }

    function pushTransferIntoAsset(Utils.TransferData memory transfer, uint256 tokenId) public onlyOwner {
        Utils.AssetData storage asset = assets[tokenId];
        asset.transactions[asset.transactionsCount] = transfer;
        asset.transactionsCount++;
    }

    function getTransfersFromAssetId(uint256 tokenId) public view returns (Utils.TransferData[] memory) {
        Utils.AssetData storage asset = assets[tokenId];
        Utils.TransferData[] memory transfers = new Utils.TransferData[](asset.transactionsCount);
        for (uint256 i = 0; i < asset.transactionsCount; i++) {
            transfers[i] = asset.transactions[i];
        }
        return transfers;
    }
}
