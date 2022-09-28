const STAR_WARS_ACCEPTED_RESOURCES = ['people', 'planets', 'starships', 'films']
const STAR_WARS_API_URL = 'https://swapi.dev/api'

const POKE_API_ACCEPTED_RESOURCES = ['pokemon', 'type', 'ability']
const POKE_API_URL = 'https://pokeapi.co/api/v2'

const createApi = (url, acceptedResources) => {
  return new Proxy({}, {
    get: (target, prop) => {
      return async (id, queryParams) => {
        if (!acceptedResources.includes(prop))
          return Promise.reject({ error: `Resource ${prop} not accepted` })

        let params = queryParams
          ? `?${new URLSearchParams(queryParams).toString()}`
          : ''

        const resource = `${url}/${prop}/${id}${params}`
        console.log(resource)

        const res = await globalThis.fetch(resource)
        if (res.ok) return res.json()
        return Promise.reject({ error: `Something went wrong happened with '${resource}'` })
      }
    }
  })
}

const starWarsApi = createApi(STAR_WARS_API_URL, STAR_WARS_ACCEPTED_RESOURCES)
const luke = await starWarsApi.people(1)

const pokeApi = createApi(POKE_API_URL, POKE_API_ACCEPTED_RESOURCES)
const pokemons = await pokeApi.pokemon('', { limit: 151, offset: 0 })