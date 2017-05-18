import APIModel from 'utils/APIModel'

const Search = new APIModel('Search', {
  name: String,
  domain: String,
  status: {
    type: String,
    default: 'pending'
  },
  emails: [],
  error: {},
  processes: {
    type: Number,
    default: 0
  },
  leftToProcess: {
    type: Number,
    default: 0
  }
})

export default Search.model
