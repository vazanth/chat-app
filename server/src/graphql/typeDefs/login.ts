export default `

  input in_login{
    user_name : String
    password: String!
  }

  type res_login{
    status: String
    token: String
    payload: User
  }

  type Query{
    login(payload_input: in_login!): res_login
  }
`