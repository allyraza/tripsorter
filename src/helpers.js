export function reduceOptions(acc, item, properties) { 
  acc.push(item.departure);
  acc.push(item.arrival);

  return acc; 
}

export function filterOptions(item, i, collection) {
  return collection.indexOf(item) === i;
}

export function formatCurrency(amount, currency="$") {
	return [currency, amount].join("");
}