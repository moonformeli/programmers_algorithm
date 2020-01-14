const sumTrucksWeights = trucks =>
  trucks.reduce((total, weight) => total + weight, 0);
const isLte = limit => weight => weight <= limit;
const head = items => items[0];

const solution = (bridgeLength, weight, truckWeights) => {
  let time = 0;

  const posOfTrucks = [];
  const crossingTrucks = [];
  const waitingTrucks = truckWeights.slice();
  const isLteLimit = isLte(weight);
  const hasFirstTruckArrived = pos => head(pos) > bridgeLength;

  while (true) {
    time += 1;

    // 모든 트럭 1칸씩 이동
    posOfTrucks.forEach((_, i) => (posOfTrucks[i] += 1));

    // 다리 마지막에 도착한 트럭 하차
    if (hasFirstTruckArrived(posOfTrucks)) {
      crossingTrucks.shift();
      posOfTrucks.shift();
    }

    // 다리를 건널 수 있다면 다음 트럭 출발
    const weights = sumTrucksWeights(crossingTrucks) + head(waitingTrucks);
    if (isLteLimit(weights)) {
      crossingTrucks.push(waitingTrucks.shift());
      posOfTrucks.push(1);
    }

    // 대기 차량이 없고 모든 택시가 다리에서 하차했다면 종료
    if (!waitingTrucks.length && !crossingTrucks.length) {
      break;
    }
  }

  return time;
};
