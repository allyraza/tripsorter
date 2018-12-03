export const SORTBY_CHEAPEST = 'cheapest';
export const SORTBY_FASTEST = 'fastest';
export const CURRENCY_EUR = 'EUR';

export function reduceOptions(acc, item) { 
  acc.push(item.departure);
  acc.push(item.arrival);
  return acc; 
}

export function filterOptions(item, i, collection) {
  return collection.indexOf(item) === i;
}

export function cheapest(deal) {
  let cost = parseInt(deal.cost);
  let discount = cost * (parseInt(deal.discount) || 0) / 100;
  return cost - discount;
}

export function fastest(i) {
  const h = parseInt(i.duration.h) || 0;
  const m = parseInt(i.duration.m) || 0;

  return (h * 60) + m;
}

export function makeGraph(data, fn) {
  let result = {};
  let weights = {};

  for (let i in data) {
    let deal = data[i];
    deal.weight = fn(deal);
    let {departure, arrival, weight} = deal;
    let key = `${departure}_${arrival}`;
    result[departure] = result[departure] || {};

    if (!weights[key] || weight < weights[key]) {
      weights[key] = weight;
      result[departure][arrival] = {weight: weight, index: parseInt(i)};
    }
  }

  return result;
}

function distance(weights, searched) {
  let min = null;

  for (let i in weights) {
    if (searched.hasOwnProperty(i)) {
      continue;
    }

    if (!min || weights[i] < weights[min]) {
      min = i;
    }
  }

  return min;
}

export function makeResult(data, path, end) {
  let parent = parseInt(path[end]);
  let items = [];
  let cost = 0;
  let duration = {
    h: 0,
    m: 0,
  };

  while(parent) {
    let deal = data[parent];
    cost += cheapest(deal);

    duration.h += parseInt(deal.duration.h);
    duration.m += parseInt(deal.duration.m);

    items.unshift(deal);
    parent = parseInt(path[deal.departure]);
  }

  return {
    items: items,
    cost: cost,
    duration: duration
  };
}

export function shortestPath(graph, start, end, fn) {
  const weights = {};
  const path = {};
  const searched = {};
  
  for (let n in graph[start]) {
    weights[n] = graph[start][n].weight;
    path[n] = graph[start][n].index;
  }
  
  let current = distance(weights, searched);
  
  while (current) {
    for (let i in graph[current]) {
      if (i === start) {
        continue;
      }
      
      let newWeight = weights[current] + graph[current][i].weight;
      if (!weights[i] || weights[i] > newWeight) {
        weights[i] = newWeight;
        path[i] = graph[current][i].index;
      }
    }
    
    searched[current] = true;
    current = distance(weights, searched);
  }

  return {
    path: path, 
    total: weights[end]
  };
}

export function formatCurrency(amount, currency) {
  if (currency === CURRENCY_EUR) {
    return `${amount}€`
  }

  return `$${amount}`;
}
