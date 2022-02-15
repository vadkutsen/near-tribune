import { keyStores, Near, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";

export const CONTRACT_ID = process.env.VUE_APP_CONTRACT_ID;
const gas = new BN(process.env.VUE_APP_gas);


// new NEAR is used here to  awoid  async/await
export const near = new Near({
  networkId: process.env.VUE_APP_networkId,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.VUE_APP_nodeUrl,
  walletUrl: process.env.VUE_APP_walletUrl,
});

export const wallet = new WalletConnection(near, "near_tribune");

//function to get all posts
export const getPosts = () => {
  return wallet.account().viewFunction(CONTRACT_ID, "get_posts");
};

//function to get post by id
export const getPost = (postId) => {
  return wallet.account().viewFunction(
    CONTRACT_ID,
    "get_post",
    {
      post_id: parseInt(postId)
    }
    );
};

//function to get total donations
export const getDonations = (author_id) => {
  return wallet.account().viewFunction(CONTRACT_ID, "get_donations");
};

//function to add a post
export const addPost = (post) => {
  console.log(post)
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: "add_post",
    args: {
      title: post.title,
      text: post.text,
    },
  });
};

//function to update post
export const updatePost = (post) => {
  console.log(post)
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: "update_post",
    args: {
      id: post.id,
      title: post.title,
      text: post.text,
    },
  });
};

//function to adopt a pet
// export const adopt = (petId) => {
//   return wallet.account().functionCall({
//     contractId: CONTRACT_ID,
//     methodName: "adopt",
//     args: {
//       pet_id: parseInt(petId)},
//   });
// };

//function to donate
// export const donate = (attachedDeposit) => {
//   attachedDeposit = utils.format.parseNearAmount(attachedDeposit)
//     return wallet.account().functionCall({
//         contractId: CONTRACT_ID,
//         methodName: "donate",
//         attachedDeposit:attachedDeposit
//     })
// }
