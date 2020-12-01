export default `
  input in_register{
    first_name: String
    last_name: String
    user_name: String!
    email: String!
    password: String!
    confirm_password: String!
    gender: String
  }

  type res_register{
    status: String
    id: ID
    error: String
  }

  type Mutation{
    register(payload_input: in_register): res_register
  }
`