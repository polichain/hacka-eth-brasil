import { artifacts, ethers } from "hardhat";
import fs from "fs";
import path from "path";
import { Contract } from "ethers";

export async function main() {
    const assetFactory = await ethers.getContractFactory("Asset");

    const asset = await assetFactory.deploy();

    console.log("Asset deployed to:", asset.address);

    const supplyChainsFactory = await ethers.getContractFactory("SupplyChains");

    const supplyChains = await supplyChainsFactory.deploy(asset.address);

    console.log("SupplyChains deployed to:", supplyChains.address);
    
    const [user] = await ethers.getSigners();

    asset.connect(user).transferOwnership(supplyChains.address);

    saveFrontendFiles(supplyChains, "SupplyChains");
}

function saveFrontendFiles(contract: Contract, name: string) {
	const contractsDir = path.join(__dirname, "..", "..", "frontend", "src", "contracts");
  
	if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
	}
  const ContractArtifact = artifacts.readArtifactSync(name);
  
	fs.writeFileSync(
    path.join(contractsDir, "contract-config.json"),
    JSON.stringify({ address: contract.address, abi: ContractArtifact }, undefined, 2)
	);
}

main().then(() => {
  console.log('Everything is up and running!')
}).catch((error) => {
	console.error(error);
	process.exitCode = 1;
});