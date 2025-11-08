import Instance from "./Instance"

export const getCharacters = async (page = 1) => {
  try {
    const res = await Instance.get(`/people/?page=${page}`)
    const result = res.data.results

    const allData = await Promise.all(
      result.map(async (char) => {
        let homeworld = ""
        let species = []
        let films = []

        try {
          if (char.homeworld) {
            const h = await Instance.get(char.homeworld)
            homeworld = h.data.name
          }

          if (char.species && char.species.length > 0) {
            const s = await Promise.all(char.species.map((url) => Instance.get(url)))
            species = s.map((i) => i.data.name)
          }

          if (char.films && char.films.length > 0) {
            const f = await Promise.all(char.films.map((url) => Instance.get(url)))
            films = f.map((i) => i.data.title)
          }
        } catch (err) {
          console.log("error while fetching extra info", err)
        }

        return { ...char, homeworld, species, films }
      })
    )

    return { ...res.data, results: allData }
  } catch (err) {
    console.log("error in getCharacters", err)
    throw err
  }
}

export const getHomeworld = async (url) => {
  try {
    const res = await Instance.get(url)
    return res.data
  } catch (err) {
    console.log("error in getHomeworld", err)
  }
}

export const getSpecies = async (url) => {
  try {
    const res = await Instance.get(url)
    return res.data
  } catch (err) {
    console.log("error in getSpecies", err)
  }
}

export const getFilm = async (url) => {
  try {
    const res = await Instance.get(url)
    return res.data
  } catch (err) {
    console.log("error in getFilm", err)
  }
}
