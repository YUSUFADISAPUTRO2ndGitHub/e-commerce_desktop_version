const cars = [
    {type:"Volvo", year:'Jl. Perintis Kemerdekaan No.KM.10, Tamalanrea Indah, Kec. Tamalanrea, Kota Makassar, Sulawesi Selatan 90245'},
    {type:"Saab", year:'Jl. Perintis Kemerdekaan No.KM.10, Tamalanrea Indah, Kec. Tamalanrea, Kota Makassar, Jakarta Selatan 14045'},
    {type:"BMW", year:'Jl. Perintis Kemerdekaan No.KM.10, Tamalanrea Indah, Kec. Tamalanrea, Kota Makassar, Sulawesi Selatan 90345'},
    {type:"BMW", year:'Jl. Perintis Kemerdekaan No.KM.10, Tamalanrea Indah, Kec. Tamalanrea, Kota Makassar, Sulawesi Selatan 90245'},
    {type:"BMW", year:'Jl. Perintis Kemerdekaan No.KM.10, Tamalanrea Indah, Kec. Tamalanrea, Kota Makassar, Sulawesi Selatan 90345'},
    {type:"BMW", year:'Jl. Perintis Kemerdekaan No.KM.10, Tamalanrea Indah, Kec. Tamalanrea, Kota Makassar, Sulawesi Selatan 90245'},
    {type:"BMW", year:'Jl. Perintis Kemerdekaan No.KM.10, Tamalanrea Indah, Kec. Tamalanrea, Kota Makassar, Sulawesi Selatan 14045'},
    {type:"BMW", year:'Jl. Perintis Kemerdekaan No.KM.10, Tamalanrea Indah, Kec. Tamalanrea, Kota Makassar, Sulawesi Selatan 14045'},
    {type:"BMW", year:'Jl. Perintis Kemerdekaan No.KM.10, Tamalanrea Indah, Kec. Tamalanrea, Kota Makassar, Sulawesi Selatan 727272'}
  ];
// cars.sort(function(a, b){return a.year  == b.year});
cars.sort(function (a, b) {
    let left = a.year.toUpperCase();
    let right = b.year.toUpperCase();

    return (left === right) ? 0 : left > right ? 1 : -1;
  });

console.log(cars)