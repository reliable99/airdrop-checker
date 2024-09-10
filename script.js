const addressInp = document.getElementById("addressInput");
const checkButton = document.getElementById("checkButton");
const result = document.getElementById("result");

const leaves = [
  "0xf315ffdcae0ae58180780ddd9fa8032740a5ec0b",
  "0xb6c0385f254dbca59ff55ff0ada6376b832637fa",
  "0x6c795ecc99e566f69f645dbea3e7a2177eecbda4",
  "0x180484938826d1a654fe814c21337a04ef2ebaef",
  "0x485e33b73336ad8bd1e0593c9fc26266e622dc03",
  "0xdb1e9e312cf8d2c9c3ac4690a8f377d1a86cc20d",
  "0x4528190f2a48000668411ce3cf9a2c128162bdf7",
  "0x97c61007071ccef8b3a4da9e8ede858f58c81c0f",
  "0x79c22e8a0713be3b2c92228c227663e8f7c06a4f",
  "0x8b360dadcfa85a8c660ea67a90651fd393517f9a",
];

checkButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked")
  async function execute() {
    const mappedLeaves = leaves.map((x) => CryptoJS.SHA256(x).toString());
    const tree = new MerkleTree(mappedLeaves, CryptoJS.SHA256);
    const root = tree.getRoot().toString("hex");


    const input = addressInp.value.trim();
    const leaf = CryptoJS.SHA256(input);
    const proof = tree.getProof(leaf);
    console.log(tree.verify(proof, leaf, root));
    const isValid = tree.verify(proof, leaf, root)

    isValid ? result.innerHTML = `Eligible` : result.innerHTML = 'Not eligible'

  }

  execute();
});
