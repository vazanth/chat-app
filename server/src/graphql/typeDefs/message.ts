export default `

  type Message{
    msg_id: ID!
    sender: String
    sender_id: ID
    receiver: String
    receiver_id: ID
    msg: String
    created_at: String
  }

  input in_message_filter{
    sender: String
    receiver: String
    msg_id: ID
  }

  input in_msg_conversation{
    sender_id: ID!
    receiver_id: ID!
  }

  input in_message{
    sender: String!
    sender_id: ID!
    receiver: String!
    receiver_id: ID!
    msg: String!
    created_at: String
  }

  type Query{
    getMessage(filter: in_message_filter, conversation: in_msg_conversation): [Message]
  }

  type Mutation{
    createMessage(payload_input: in_message): Message
  }
`