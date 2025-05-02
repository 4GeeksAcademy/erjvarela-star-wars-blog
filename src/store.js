export const initialStore = () => {
  const savedStore = localStorage.getItem('store');
  if (savedStore) {
    return JSON.parse(savedStore);
  }
  return {
    favorites: [],
    people: {
      content: [],
      page: 1,
      totalPages: 1,
    },
    vehicles: {
      content: [],
      page: 1,
      totalPages: 1,
    },
    planets: {
      content: [],
      page: 1,
      totalPages: 1,
    },
  };
};

export default function storeReducer(store, action = {}) {
  let newStore;

  switch(action.target){
    case 'favorites':
      switch(action.type){
        case 'add':
          const { uid, name, type } = action.payload;
          newStore = {
            ...store,
            favorites: [ ...store.favorites, { uid: uid, name: name, type: type } ]
          };
          break;
        case 'remove':
          const { removeId } = action.payload;
          newStore = {
            ...store,
            favorites: store.favorites.filter(favorite => favorite.uid !== removeId)
          };
          break;
        default:
          throw Error('Unknown action.');
      }
      break;
    case 'people':
      switch (action.type) {
        case 'set':
          newStore = {
            ...store,
            people: action.payload,
          };
          break;
        default:
          throw Error('Unknown action.');
      }
      break;

    case 'vehicles':
      switch (action.type) {
        case 'set':
          newStore = {
            ...store,
            vehicles: action.payload,
          };
          break;
        default:
          throw Error('Unknown action.');
      }
      break;

    case 'planets':
      switch (action.type) {
        case 'set':
          newStore = {
            ...store,
            planets: action.payload,
          };
          break;
        default:
          throw Error('Unknown action.');
      }
      break;

    default:
      throw Error('Unknown action.');
  }
  

  // Guardar el nuevo estado en localStorage
  localStorage.setItem('store', JSON.stringify(newStore));
  return newStore;
}
