import { keyStores, Near, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";

export const CONTRACT_ID = process.env.VUE_APP_CONTRACT_ID;
const gas = new BN(process.env.VUE_APP_GAS);


// new NEAR is used here to  awoid  async/await
export const near = new Near({
  networkId: process.env.VUE_APP_NETWORKID,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.VUE_APP_NODEURL,
  walletUrl: process.env.VUE_APP_WALLETURL,
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

//function to add a post
export const addPost = (post) => {
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
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: "update_post",
    args: {
      post_id: parseInt(post.id),
      title: post.title,
      text: post.text,
    },
  });
};

//function to tip author
export const tipAuthor = (form) => {
  const amount = utils.format.parseNearAmount(form.tips.toString());
    return wallet.account().functionCall({
        contractId: CONTRACT_ID,
        methodName: "tip_author",
        attachedDeposit: amount,
        args: {
          author_id: form.author
        }
    })
}

//function to get tips amount by account
export const getTips = async () => {
  const tips = await wallet.account()
    .viewFunction(CONTRACT_ID, "get_tips", {
      author_id: wallet.getAccountId()
    }
  );
  return (tips/1000000000000000000000000).toFixed(2);
};

//function to withdraw tips
export const withdrawTips = () => {
    return wallet.account().functionCall({
        contractId: CONTRACT_ID,
        methodName: "withdraw_tips",
    })
}
