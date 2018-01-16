const formatAssetName = asset => {
  if (asset === 'opWalls') {
    return 'Operable Walls'
  } else if (asset === 'pcLab') {
    return 'PC Lab'
  } else if (asset === 'macLab') {
    return 'Mac Lab'
  } else if (asset === 'tv') {
    return 'TV'
  } else if (asset === 'whiteBoard') {
    return 'Whiteboard'
  } else if (asset === 'projector') {
    return 'Projector'
  }
}

export default formatAssetName
