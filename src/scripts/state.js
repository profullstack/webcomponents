let state = {
  name: 'Nick',
  sex: 'male',
  hobbies: []
}

const updateHobbies = async() => {
  const hobbies = // some fetch call
   
  setState('hobbies', hobbies);
}

const setState = (key, value) => {
  state = { ...state, [key]: value }
}
const getState = () => {
  return { ...state }
}
