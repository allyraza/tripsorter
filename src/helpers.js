export const SORTBY_CHEAPEST = 'cheapest';
export const SORTBY_FASTEST = 'fastest';

export function reduceOptions(acc, item) { 
  acc.push(item.departure);
  acc.push(item.arrival);
  return acc; 
}

export function filterOptions(item, i, collection) {
  return collection.indexOf(item) === i;
}


export function makeGraph(data, fn) {
  let result = {};
  let weights = {};

  for (let d in data) {
    let {departure, arrival} = data[d];
    let weight = fn(data[d]);
    let key = [departure, arrival].join("");

    result[departure] = result[departure] || {};

    if (!weights.hasOwnProperty(key) || weight < weights[key]) {
      result[departure][arrival] = Object.assign({weight: weight}, data[d]);
      weights[key] = weight;
    }
  }

console.log(result, weights);
  return result;
}

export function cheapest(i) {
  return parseInt(i.cost);
}

export function fastest(i) {
  return parseInt(i.duration.h)*60 + parseInt(i.duration.m);
}

function distance(weights, searched) {
  var m = null;
  
  for (var i in weights) {    
    if (searched[i]) {
     continue;
    }

    if (!weights[m] || weights[i] < weights[m]) {
      m = i;
    }
  }
  
  return m;
}

function makePath(path, end) {
  let result = [];
  let parent = path[end];

  while (!!parent) {
    result.unshift(parent);
    parent = path[parent.departure];
  }
  
  return result;
}

export function shortestPath(graph, start, end) {
  const weights = {[end]: null};
  const path = {[end]: null};

  for (var n in graph[start]) {
    if (graph.hasOwnProperty(n)) {
      weights[n] = graph[start][n].weight;
      path[n] = graph[start];
    }
  }

  const searched = {};
  var current = distance(weights, searched);

  while (current) {
    let neighbors = graph[current];

    for (let n in neighbors) {
      if (n === start || !graph.hasOwnProperty(n)) {
        continue;
      }

      let newWeight = weights[current] + neighbors[n].weight;
      if (!weights[n] || weights[n] > newWeight) {
        weights[n] = newWeight;
        path[n] = graph[current];
      }
    }

    searched[current] = true;
    current = distance(weights, searched);
  }

  return {
    total: weights[end],
    path: makePath(path, end)
  };
}

export function formatCurrency(amount, currency="$") {
  return [currency, amount].join("");
}
