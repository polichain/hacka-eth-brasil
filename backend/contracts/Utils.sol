// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Utils {
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

    struct Company {
        string name;
        string description;
        string documentNumber;
        string category;
        uint256[] supplyChainsParticipant;
    }

    struct Suggestion {
        SuggestionType suggestionType;
        bytes encodedCalldata;
        bool isOpen;
        bool sucedded;
        uint256 voteCount;
    }

    enum SuggestionType {
        CHANGE_NAME,
        CHANGE_DESCRIPTION,
        ADD_MEMBER,
        REMOVE_MEMBER
    }
}