const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    }
    else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
const roadGraph = buildGraph(roads);
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}
let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}
function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}
VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState ("Post Office", parcels);
};

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}
function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}
function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
function runRobot2(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}
function compareRobots(robot1, memory1, robot2, memory2) {
  let stepsOfRobot1 = 0;
  let stepsOfRobot2 = 0;
  for (let i = 1; i <= 100; i++) {
    let task = VillageState.random();
    stepsOfRobot1 += runRobot2(task, robot1, memory1);
    stepsOfRobot2 += runRobot2(task, robot2, memory2);
  }
  let reslutOfRobot1 = stepsOfRobot1 / 100;
  let reslutOfRobot2 = stepsOfRobot2 / 100;
  console.log(`Average for Robot 1 is ${reslutOfRobot1}, average for Robot 2 is ${reslutOfRobot2}`);
}
function yourRobot({place, parcels}, route) {
  if (route.length == 0) {
    if (!parcels.some(w => w.place == place)) {
      let parcel = parcels[0];
      route = findRoute(roadGraph, place, parcel.place);
      for (let i = 1; i < parcels.length; i++) {
        parcel = parcels[i];
        let anotherRoute = findRoute(roadGraph, place, parcel.place);
        if (route.length > anotherRoute.length) {
          route = anotherRoute;
        }
      }
      return {direction: route[0], memory: route.slice(1)};
    }
    let parcelsFiltered = parcels.filter(m => m.place = place);
    let parcel = parcelsFiltered[0];
    route = findRoute(roadGraph, place, parcel.address);
    for (let i = 1; i < parcelsFiltered.length; i++) {
      parcel = parcelsFiltered[i];
      let anotherRoute = findRoute(roadGraph, place, parcel.address);
      if (route.length > anotherRoute.length) {
        route = anotherRoute;
      }
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
function yourRobot2({place, parcels}, route) {
  if (route.length == 0) {
      let parcelsFiltered = parcels.filter(m => m.place = place);
      if (parcelsFiltered.length === parcels.length) {
          let parcelToDeliver = parcels[0];
          route = findRoute(roadGraph, place, parcelToDeliver.address);
          for (let i = 1; i < parcels.length; i++) {
              parcelToDeliver = parcels[i];
              let anotherRoute = findRoute(roadGraph, place, parcelToDeliver.address);
              if (route.length > anotherRoute.lenght) {
                  route = anotherRoute;
              }
          }
          return {direction: route[0], memory: route.slice(1)};
      }
      let parcelToPickUp = parcels[0];
      route = findRoute(roadGraph, place, parcelToPickUp.place);
      for (let i = 1; i < parcels.length; i++) {
          parcelToPickUp = parcels[i];
          let anotherRoute = findRoute(roadGraph, place, parcelToPickUp.place);
          if (route.length > anotherRoute.length) {
              route = anotherRoute;
          }   
      }
      for (let i = 0; i < parcelsFiltered.length; i++) {
          let parcelToDeliver = parcelsFiltered[i];
          let anotherRoute = findRoute(roadGraph, place, parcelToDeliver.address);
          if (route.length > anotherRoute.length) {
            route = anotherRoute;
          }
      }
  }
  return {direction: route[0], memory: route.slice(1)};
}
function lazyRobot({place, parcels}, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return {route: findRoute(roadGraph, place, parcel.place),
                pickUp: true};
      } else {
        return {route: findRoute(roadGraph, place, parcel.address),
                pickUp: false};
      }
      
    });
    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }

  return {direction: route[0], memory: route.slice(1)};
}
compareRobots(yourRobot, [], goalOrientedRobot, []);
compareRobots(yourRobot, [], yourRobot2, []);
compareRobots(yourRobot, [], lazyRobot, []);
