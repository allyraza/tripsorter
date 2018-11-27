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
  var weights = {};

  return data.reduce((a, i) => {
    i.weight = fn(i);
    a[i.departure] = a[i.departure] || {};

    if (!weights[i.departure] || i.weight < weights[i.departure]) {
      a[i.departure][i.arrival] = i;
    }
    
    return a;
  }, {});
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
  let result = [end];
  let parent = path[end];

  while (parent) {
    result.unshift(parent);
    parent = path[parent];
  }
  
  return result;
}

export function shortestPath(data, start, end, sortBy) {
  const graph = makeGraph(data, sortBy === SORTBY_CHEAPEST ? cheapest : fastest);
  const weights = {[end]: null};
  
  
  for (var n in graph[start]) {
    weights[n] = graph[start][n].weight;
  }

  const path = {[end]: null};
  for (let n in graph[start]) {
    path[n] = data[start];
  }

  const searched = {};
  let node = distance(weights, searched);
  
  while (node) {
    let neighbors = graph[node];
    
    for (let n in neighbors) {
      if (n === start) {
        continue;
      }
      
      let newWeight = weights[node] + neighbors[n].weight;
      if (!weights[n] || weights[n] > newWeight) {
        weights[n] = newWeight;
        path[n] = node;
      }
    }

    searched[node] = true;
    node = distance(weights, searched);
  }

  return {
    total: weights[end],
    path: makePath(path, end)
  };
}

export function formatCurrency(amount, currency="$") {
  return [currency, amount].join("");
}
