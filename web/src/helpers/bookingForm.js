// formats the time extracted from the time inputs into an array
// 8:30 => [8, 30]
const formatTime = (time) => {
  let formatedTimeArray = []
  formatedTimeArray = time.split(':').map((item) => parseInt(item))
  return formatedTimeArray
}

export default formatTime