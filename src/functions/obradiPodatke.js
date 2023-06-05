export default function obradiPodatke({vrsta, boja, velicina, datum}, id) {
  return {
    odjevniPredmet: {
      vrsta: vrsta,
      boja: boja,
      velicina: velicina,
    },
    datumKupnje: {
      datum: datum,
    },
    id:id
  };
}
