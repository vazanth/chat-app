export default `

  input in_user_filter{
    user_id: ID
    user_name: String
    email: String
  }

  type User{
    user_id: ID
    user_name: String!
    first_name: String
    last_name: String
    email: String
    avatar: String
    gender: String
    message: Message
  }

  type Query{
    getUser(filter: in_user_filter, filter_cur_user: ID): [User]
  }
`