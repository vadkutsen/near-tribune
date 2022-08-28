use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, Vector};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, setup_alloc, AccountId, Promise};

setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
/// Contract structure is represented here
pub struct NearTribune {
  /// The contact must have posts collection
  pub posts: UnorderedMap<u64, Post>,
  /// tips collection
  pub tips: UnorderedMap<AccountId, u128>,
  /// and comments collection
  pub comments: UnorderedMap<u64, Vec<(AccountId, String)>>,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
/// Post structure is defined here
pub struct Post {
  title: String,
  text: String,
  author: AccountId,
  created_at: u64,
}
/// Default implementation of the contract
impl Default for NearTribune {
  fn default() -> Self {
    Self {
      posts: UnorderedMap::new(b"p".to_vec()),
      tips: UnorderedMap::new(b"t".to_vec()),
      comments: UnorderedMap::new(b"c".to_vec()),
    }
  }
}

#[near_bindgen]
/// The contract implementation
impl NearTribune {

  /// Function for adding post
  pub fn add_post(&mut self, title: String, text: String) -> bool {
    assert!(title.len() > 0, "Title is reqired.");
    assert!(text.len() > 0, "Text is required.");
    let new_post = Post {
      title: title,
      text: text,
      author: env::predecessor_account_id(),
      created_at: env::block_timestamp(),
    };
    let id = self.posts.len();//env::block_timestamp();
    env::log(format!("Adding post with id {} ", id).as_bytes());
    self.posts.insert(&id, &new_post);
    true
  }

  /// Function for updating a post
  pub fn update_post(&mut self, post_id: u64, title: String, text: String) -> bool {
    let editor_id = env::predecessor_account_id();
    let post = self.get_post(post_id);
    assert_eq!(editor_id, post.author, "Only author can update the post.");
    env::log(format!("Updating post with id {}", &post_id).as_bytes());
    let updated_post = Post {
        title: title,
        text: text,
        ..post
    };
    self.posts.insert(&post_id, &updated_post);
    true
  }

  #[payable]
  /// Function for tips
  pub fn tip_author(&mut self, author_id: AccountId) -> bool {
      let deposit = env::attached_deposit();
      let donator_account_id: String = env::predecessor_account_id();
      assert!(deposit > 0, "The amount of tips should be greater than 0");
      // assert_ne!(author_id, donator_account_id, "You cannot tip yourself");
      let total = self.tips.get(&author_id).unwrap_or(0) + deposit;
      self.tips.insert(&author_id, &total);
      env::log(format!("@{} sent {} yNEAR to @{}", donator_account_id, deposit, author_id).as_bytes());
      true
  }

  /// Function for tips withdrawal
  pub fn withdraw_tips(&mut self) -> Promise {
      let account_id: String = env::predecessor_account_id();
      let withdrowal_amount = self.tips.get(&account_id).unwrap_or(0);
      assert!(withdrowal_amount > 0, "Withdrowal amount should be greater than 0");
      env::log(format!("@{} withdraw {} yNEAR", &account_id, withdrowal_amount).as_bytes());
      self.tips.remove(&account_id);
      Promise::new(account_id).transfer(withdrowal_amount)
  }

  pub fn add_comment(&mut self, post_id: u64, text: String) -> bool {
    assert!(self.posts.get(&post_id).is_some(), "Post not found");
    assert!(text.len() > 0, "Comment text is required.");
    env::log(format!("Adding a comment to the post with id {} ", &post_id).as_bytes());
    self.comments.insert(&post_id, &vec!((env::predecessor_account_id(), text)));
    true
  }

  /// Getters

  /// Returns all posts
  pub fn get_posts(&self) -> Vec<(u64, Post)> {
    self.posts.iter().collect()
  }

  /// Returns a post by id
  pub fn get_post(&self, post_id: u64) -> Post {
    assert!(self.posts.get(&post_id).is_some(), "Post with id {} not found.", &post_id);
    self.posts.get(&post_id).unwrap()
  }

  /// Returns donations by author
  pub fn get_tips(&self, author_id: AccountId) -> u128 {
    self.tips.get(&author_id).unwrap_or(0)
  }

  /// Returns comments by the post id
  pub fn get_comments(&self, post_id: u64) -> Vec<(AccountId, String)> {
    assert!(self.posts.get(&post_id).is_some(), "Post with id {} not found.", &post_id);
    self.comments.get(&post_id).unwrap()
  }
}

#[cfg(test)]
mod tests {
  use super::*;
  use near_sdk::MockedBlockchain;
  use near_sdk::{testing_env, VMContext};

  fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
    VMContext {
      current_account_id: "alice_near".to_string(),
      signer_account_id: "bob_near".to_string(),
      signer_account_pk: vec![0, 1, 2],
      predecessor_account_id: "sam_near".to_string(),
      input,
      block_index: 0,
      block_timestamp: 0,
      account_balance: 0,
      account_locked_balance: 0,
      storage_usage: 0,
      attached_deposit: 1_000_000_000_000_000_000_000,
      prepaid_gas: 10u64.pow(18),
      random_seed: vec![0, 1, 2],
      is_view,
      output_data_receivers: vec![],
      epoch_height: 19,
    }
  }

  #[test]
  fn add_then_get_posts() {
    let context = get_context(vec![], false);
    testing_env!(context);
    let mut contract = NearTribune::default();
    let add = contract.add_post(
      "title".to_string(),
      "text".to_string(),
    );
    let posts = contract.get_posts();
    assert!(add);
    assert_eq!(1, posts.len());
    let post = contract.get_post(0);
    assert_eq!("title".to_string(), post.title);
    assert_eq!("text".to_string(), post.text);
    assert_eq!("sam_near".to_string(), post.author);
  }

  #[test]
  #[should_panic(expected="Title is reqired.")]
  fn title_is_empty() {
    let context = get_context(vec![], false);
    testing_env!(context);
    let mut contract = NearTribune::default();
    contract.add_post(
      "".to_string(),
      "text".to_string(),
    );
  }

  #[test]
  #[should_panic(expected="Text is required.")]
  fn text_is_empty() {
    let context = get_context(vec![], false);
    testing_env!(context);
    let mut contract = NearTribune::default();
    contract.add_post(
      "title".to_string(),
      "".to_string(),
    );
  }

  #[test]
  fn update_and_get_post() {
    let context = get_context(vec![], false);
    testing_env!(context);
    let mut contract = NearTribune::default();
    contract.add_post(
      "title".to_string(),
      "text".to_string(),
    );
    let update = contract.update_post(0, "new title".to_string(), "new text".to_string());
    assert!(update);
    let posts = contract.get_posts();
    assert_eq!(1, posts.len());
    let post = contract.get_post(0);
    assert_eq!("new title".to_string(), post.title);
    assert_eq!("new text".to_string(), post.text);
  }

  #[test]
  #[should_panic(expected="Only author can update the post.")]
  fn cannot_update_if_not_an_author() {
    let context = get_context(vec![], false);
    testing_env!(context);
    let mut contract = NearTribune::default();
    contract.add_post(
      "title".to_string(),
      "text".to_string(),
    );
    let mut context = get_context(vec![], false);
    context.predecessor_account_id = "john_near".to_string();
    testing_env!(context);
    contract.update_post(0, "new title".to_string(), "new text".to_string());
  }

  #[test]
  fn tip_author() {
    let context = get_context(vec![], false);
    testing_env!(context);
    let mut contract = NearTribune::default();
    assert_eq!(contract.get_tips("bob_near".to_string()), 0);
    let tip = contract.tip_author("bob_near".to_string());
    assert!(tip);
    assert_eq!(contract.get_tips("bob_near".to_string()), 1_000_000_000_000_000_000_000);
  }

  // #[test]
  // #[should_panic(expected="You cannot tip yourself")]
  // fn cannot_tip_yourself() {
  //   let mut context = get_context(vec![], false);
  //   context.predecessor_account_id = "bob_near".to_string();
  //   testing_env!(context);
  //   let mut contract = NearTribune::default();
  //   contract.tip_author("bob_near".to_string());
  // }

  #[test]
  fn withraw_tips() {
    let context = get_context(vec![], false);
    testing_env!(context);
    let mut contract = NearTribune::default();
    let tip = contract.tip_author("sam_near".to_string());
    assert!(tip);
    assert_eq!(contract.get_tips("sam_near".to_string()), 1_000_000_000_000_000_000_000);
    contract.withdraw_tips();
    assert_eq!(contract.get_tips("sam_near".to_string()), 0);
  }

  #[test]
  #[should_panic(expected="Withdrowal amount should be greater than 0")]
  fn cannot_withraw_0() {
    let context = get_context(vec![], false);
    testing_env!(context);
    let mut contract = NearTribune::default();
    assert_eq!(contract.get_tips("sam_near".to_string()), 0);
    contract.withdraw_tips();
  }

  #[test]
  fn add_then_get_comments() {
    let context = get_context(vec![], false);
    testing_env!(context);
    let mut contract = NearTribune::default();
    let add = contract.add_post(
      "title".to_string(),
      "text".to_string(),
    );
    assert!(add);
    let add_comment = contract.add_comment(0, "new comment".to_string());
    assert!(add_comment);
    let comments = contract.get_comments(0);
    assert_eq!(1, comments.len());
    assert_eq!("sam_near".to_string(), comments[0].0);
    assert_eq!("new comment".to_string(), comments[0].1);
  }
}
