export const getImageUrl = (vehicle) => {
  if (!vehicle) return 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop'

  if (vehicle.images && vehicle.images.length > 0) {
    const img = vehicle.images[0]
    if (typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://'))) {
      return img
    }
    return `http://localhost:5000${img}`
  }

  if (vehicle.image) {
    if (typeof vehicle.image === 'string' && (vehicle.image.startsWith('http://') || vehicle.image.startsWith('https://'))) {
      return vehicle.image
    }
    return `http://localhost:5000${vehicle.image}`
  }

  const modelLower = vehicle.model?.toLowerCase() || ''
  const makeLower = vehicle.make?.toLowerCase() || ''

  if (modelLower.includes('corvette') || makeLower.includes('chevrolet')) {
    return 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('gle') || makeLower.includes('mercedes')) {
    return 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('taycan') || makeLower.includes('porsche')) {
    return 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('m4') || makeLower.includes('bmw')) {
    return 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('q7') || makeLower.includes('audi')) {
    return 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('mustang') || makeLower.includes('ford')) {
    return 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('range rover') || modelLower.includes('velar') || makeLower.includes('land rover')) {
    return 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('fortuner') || makeLower.includes('toyota')) {
    return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('thar') || makeLower.includes('mahindra')) {
    return 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('creta') || modelLower.includes('i30') || makeLower.includes('hyundai')) {
    return 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('city') || makeLower.includes('honda')) {
    return 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('huracan') || modelLower.includes('huracán') || makeLower.includes('lamborghini')) {
    return 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('f-type') || makeLower.includes('jaguar')) {
    return 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop'
  } else if (modelLower.includes('model s') || modelLower.includes('model 3') || makeLower.includes('tesla')) {
    return 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop'
  }

  return 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop'
}
