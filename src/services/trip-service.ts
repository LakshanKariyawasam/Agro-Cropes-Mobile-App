import {Injectable} from "@angular/core";
import {TRIPS,TRIPSCOLOMBO, TRIPSAMPARA, TRIPSANURADHAPURA, TRIPSBADDULLA, TRIPSBATTIALO, TRIPSGALLE, TRIPSGAMPAHA, TRIPSHAMBANTHOTA, TRIPSJAFFNA, TRIPSKALUTHARA, TRIPSKANDY, TRIPSKEGALLE, TRIPSKILINOCHCHI, TRIPSKURUNAGALA, TRIPSMANNAR, TRIPSMATHALE, TRIPSMATHARA, TRIPSMONARAGALA, TRIPSMULLATHIVE, TRIPSNUWARAELIYA, TRIPSPOLONNARUWA, TRIPSPUTTALAM, TRIPSRATHNAPURA, TRIPSTRINCOMALEE, TRIPSVAUNIYA} from "./mock-trips";

@Injectable()
export class TripService {
  public id: any;
  public locationone: any;
  public poplocationone: any;
  private trips: any;
  private tripsAmpara: any;
  private tripsAnuradhapura: any;
  private tripsBadulla: any;
  private tripsColombo: any;
  private tripsBatticalo: any;
  private tripsGalle: any;
  private tripsGampaha: any;
  private tripsHambanthota: any;
  private tripsJaffna: any;
  private tripsKaluthara: any;
  private tripsKandy: any;
  private tripsKagalle: any;
  private tripsKilinochchi: any;
  private tripsKurunegala: any;
  private tripsMannar: any;
  private tripsMathale: any;
  private tripsMathara: any;
  private tripsMonaragala: any;
  private tripsMullathivu: any;
  private tripsNuwaraEliya: any;
  private tripsPolonnaruwa: any;
  private tripsPuttalam: any;
  private tripsRathnapura: any;
  private tripsTrincomalee: any;
  private tripsVavuniya: any;

  constructor() {
    this.trips = TRIPS;
    this.tripsAmpara = TRIPSAMPARA;
    this.tripsAnuradhapura = TRIPSANURADHAPURA;
    this.tripsBadulla = TRIPSBADDULLA;
    this.tripsBatticalo = TRIPSBATTIALO;
    this.tripsColombo = TRIPSCOLOMBO;
    this.tripsGalle = TRIPSGALLE;
    this.tripsGampaha = TRIPSGAMPAHA;
    this.tripsHambanthota = TRIPSHAMBANTHOTA;
    this.tripsJaffna = TRIPSJAFFNA;
    this.tripsKaluthara = TRIPSKALUTHARA;
    this.tripsKandy = TRIPSKANDY;
    this.tripsKagalle = TRIPSKEGALLE;
    this.tripsKilinochchi = TRIPSKILINOCHCHI;
    this.tripsKurunegala = TRIPSKURUNAGALA;
    this.tripsMannar = TRIPSMANNAR;
    this.tripsMathale = TRIPSMATHALE;
    this.tripsMathara = TRIPSMATHARA;
     this.tripsMonaragala = TRIPSMONARAGALA;
    this.tripsMullathivu = TRIPSMULLATHIVE;
    this.tripsNuwaraEliya = TRIPSNUWARAELIYA;
    this.tripsPolonnaruwa = TRIPSPOLONNARUWA;
    this.tripsPuttalam = TRIPSPUTTALAM;
    this.tripsRathnapura = TRIPSRATHNAPURA;
    this.tripsTrincomalee = TRIPSTRINCOMALEE;
    this.tripsVavuniya = TRIPSVAUNIYA;
  }

  getAll() {
    return this.trips;
  }
  getAllAmpara() {
    return this.tripsAmpara;
  }
  getAllAnuradhapura() {
    return this.tripsAnuradhapura;
  }  
  getAllBadulla() {
    return this.tripsBadulla;
  }  
  getAllBatticalo() {
    return this.tripsBatticalo;
  }  
  getAllColombo() {
    return this.tripsColombo;
  }  
  getAllGalle() {
    return this.tripsGalle;
  }  
  getAllGampaha() {
    return this.tripsGampaha;
  }  
  getAllHambanthota() {
    return this.tripsHambanthota;
  }  
  getAllJaffna() {
    return this.tripsJaffna;
  }  
  getAllKaluthara() {
    return this.tripsKaluthara;
  }  
  getAllKandy() {
    return this.tripsKandy;
  }  
  getAllKagalle() {
    return this.tripsKagalle;
  }  
  getAllKilinochchi() {
    return this.tripsKilinochchi;
  }  
  getAllKurunegala() {
    return this.tripsKurunegala;
  }  
  getAllMannar() {
    return this.tripsMannar;
  }  
  getAllMathale() {
    return this.tripsMathale;
  }  
  getAllMathara() {
    return this.tripsMathara;
  }  
  getAllMonaragala() {
    return this.tripsMonaragala;
  }  
  getAllMullathivu() {
    return this.tripsMullathivu;
  }  
  getAllNuwaraEliya() {
    return this.tripsNuwaraEliya;
  }  
  getAllPolonnaruwa() {
    return this.tripsPolonnaruwa;
  }  
  getAllPuttalam() {
    return this.tripsPuttalam;
  }  
  getAllRathnapura() {
    return this.tripsRathnapura;
  }  
  getAllTrincomalee() {
    return this.tripsTrincomalee;
  }  
  getAllVavuniya() {
    return this.tripsVavuniya;
  }

  getItem(id,location,poplocation) {

      this.locationone == location;
      this.poplocationone == poplocation;
      console.log(this.locationone);
      console.log(this.locationone);
      console.log(location);
      console.log(location);

      if(location == 'Ampara')
      {
        console.log(id);
        this.id = id;
        for (var a = 0; a < this.tripsAmpara.length; a++) {
          if (this.tripsAmpara[a].id === parseInt(id)) {
            return this.tripsAmpara[a];
          }
        }
      }

      if(location == 'Anuradhapura')
      {
        console.log(id);
        this.id = id;
        for (var b = 0; b < this.tripsAnuradhapura.length; b++) {
          if (this.tripsAnuradhapura[b].id === parseInt(id)) {
            return this.tripsAnuradhapura[b];
          }
        }
      }

      if(location == 'Badulla'|| poplocation == 'Badulla')
      {
        console.log(id);
        this.id = id;
        for (var c = 0; c < this.tripsBadulla.length; c++) {
          if (this.tripsBadulla[c].id === parseInt(id)) {
            return this.tripsBadulla[c];
          }
        }
      }

      if(location == 'Batticalo')
      {
        console.log(id);
        this.id = id;
        for (var d = 0; d < this.tripsBatticalo.length; d++) {
          if (this.tripsBatticalo[d].id === parseInt(id)) {
            return this.tripsBatticalo[d];
          }
        }
      }

      if(location == 'Colombo' || poplocation == 'Colombo')
      {
        console.log(id);
        this.id = id;
        for (var e = 0; e < this.tripsColombo.length; e++) {
          if (this.tripsColombo[e].id === parseInt(id)) {
            return this.tripsColombo[e];
          }
        }
      }

      if(location == 'Galle' || poplocation == 'Galle')
      {
        console.log(id);
        this.id = id;
        for (var f = 0; f < this.tripsGalle.length; f++) {
          if (this.tripsGalle[f].id === parseInt(id)) {
            return this.tripsGalle[f];
          }
        }
      }

      if(location == 'Gampaha')
      {
        console.log(id);
        this.id = id;
        for (var g = 0; g < this.tripsGampaha.length; g++) {
          if (this.tripsGampaha[g].id === parseInt(id)) {
            return this.tripsGampaha[g];
          }
        }
      }

      if(location == 'Hambanthota')
      {
        console.log(id);
        this.id = id;
        for (var h = 0; h < this.tripsHambanthota.length; h++) {
          if (this.tripsHambanthota[h].id === parseInt(id)) {
            return this.tripsHambanthota[h];
          }
        }
      }

      if(location == 'Jaffna')
      {
        console.log(id);
        this.id = id;
        for (var i = 0; i < this.tripsJaffna.length; i++) {
          if (this.tripsJaffna[i].id === parseInt(id)) {
            return this.tripsJaffna[i];
          }
        }
      }

      if(location == 'Kaluthara')
      {
        console.log(id);
        this.id = id;
        for (var j = 0; j < this.tripsKaluthara.length; j++) {
          if (this.tripsKaluthara[j].id === parseInt(id)) {
            return this.tripsKaluthara[j];
          }
        }
      }

      if(location == 'Kandy' || poplocation == 'Kandy')
      {
        console.log(id);
        this.id = id;
        for (var k = 0; k < this.tripsKandy.length; k++) {
          if (this.tripsKandy[k].id === parseInt(id)) {
            return this.tripsKandy[k];
          }
        }
      }

      if(location == 'Kagalle')
      {
        console.log(id);
        this.id = id;
        for (var l = 0; l < this.tripsKagalle.length; l++) {
          if (this.tripsKagalle[l].id === parseInt(id)) {
            return this.tripsKagalle[l];
          }
        }
      }

      if(location == 'Kilinochchi')
      {
        console.log(id);
        this.id = id;
        for (var m = 0; m < this.tripsKilinochchi.length; m++) {
          if (this.tripsKilinochchi[m].id === parseInt(id)) {
            return this.tripsKilinochchi[m];
          }
        }
      }

      if(location == 'Kurunegala')
      {
        console.log(id);
        this.id = id;
        for (var n = 0; n < this.tripsKurunegala.length; n++) {
          if (this.tripsKurunegala[n].id === parseInt(id)) {
            return this.tripsKurunegala[n];
          }
        }
      }

      if(location == 'Mannar')
      {
        console.log(id);
        this.id = id;
        for (var o = 0; o < this.tripsMannar.length; o++) {
          if (this.tripsMannar[o].id === parseInt(id)) {
            return this.tripsMannar[o];
          }
        }
      }

      if(location == 'Mathale')
      {
        console.log(id);
        this.id = id;
        for (var p = 0; p < this.tripsMathale.length; p++) {
          if (this.tripsMathale[p].id === parseInt(id)) {
            return this.tripsMathale[p];
          }
        }
      }

      if(location == 'Mathara')
      {
        console.log(id);
        this.id = id;
        for (var q = 0; q < this.tripsMathara.length; q++) {
          if (this.tripsMathara[q].id === parseInt(id)) {
            return this.tripsMathara[q];
          }
        }
      }

      if(location == 'Monaragala')
      {
        console.log(id);
        this.id = id;
        for (var r = 0; r < this.tripsMonaragala.length; r++) {
          if (this.tripsMonaragala[r].id === parseInt(id)) {
            return this.tripsMonaragala[r];
          }
        }
      }

      if(location == 'Mullathivu')
      {
        console.log(id);
        this.id = id;
        for (var s = 0; s < this.tripsMullathivu.length; s++) {
          if (this.tripsMullathivu[s].id === parseInt(id)) {
            return this.tripsMullathivu[s];
          }
        }
      }

      if(location == 'NuwaraEliya')
      {
        console.log(id);
        this.id = id;
        for (var t = 0; t < this.tripsNuwaraEliya.length; t++) {
          if (this.tripsNuwaraEliya[t].id === parseInt(id)) {
            return this.tripsNuwaraEliya[t];
          }
        }
      }

      if(location == 'Polonnaruwa')
      {
        console.log(id);
        this.id = id;
        for (var u = 0; i < this.tripsPolonnaruwa.length; u++) {
          if (this.tripsPolonnaruwa[u].id === parseInt(id)) {
            return this.tripsPolonnaruwa[u];
          }
        }
      }

      if(location == 'Puttalam')
      {
        console.log(id);
        this.id = id;
        for (var v = 0; v < this.tripsPuttalam.length; v++) {
          if (this.tripsPuttalam[v].id === parseInt(id)) {
            return this.tripsPuttalam[v];
          }
        }
      }

      if(location == 'Rathnapura')
      {
        console.log(id);
        this.id = id;
        for (var w = 0; w < this.tripsRathnapura.length; w++) {
          if (this.tripsRathnapura[w].id === parseInt(id)) {
            return this.tripsRathnapura[w];
          }
        }
      }


      if(location == 'Trincomalee')
      {
        console.log(id);
        this.id = id;
        for (var x = 0; x < this.tripsTrincomalee.length; x++) {
          if (this.tripsTrincomalee[x].id === parseInt(id)) {
            return this.tripsTrincomalee[x];
          }
        }
      }

      if(location == 'Vavuniya')
      {
        console.log(id);
        this.id = id;
        for (var y = 0; y < this.tripsVavuniya.length; y++) {
          if (this.tripsVavuniya[y].id === parseInt(id)) {
            return this.tripsVavuniya[y];
          }
        }
      }

      return null;
  }

  remove(item) {
    if(this.locationone == 'Ampara')
    {
      this.tripsAmpara.splice(this.tripsAmpara.indexOf(item), this.id);
    }
  
    if(this.locationone == 'Anuradhapura')
    {
    this.tripsAnuradhapura.splice(this.tripsAnuradhapura.indexOf(item), this.id);
    }

    if(this.locationone == 'Badulla' || this.poplocationone == 'Badulla')
    {
      this.tripsBadulla.splice(this.tripsBadulla.indexOf(item), this.id);
    }

    if(this.locationone == 'Batticalo')
    {
      this.tripsBatticalo.splice(this.tripsBatticalo.indexOf(item), this.id);
    }

    if(this.locationone == 'Colombo' || this.poplocationone == 'Colombo')
    {
      this.tripsColombo.splice(this.tripsColombo.indexOf(item), this.id);
    }

    if(this.locationone == 'Galle' || this.poplocationone == 'Galle')
    {
      this.tripsGalle.splice(this.tripsGalle.indexOf(item), this.id);
    }

    if(this.locationone == 'Gampaha')
    {
      this.tripsGampaha.splice(this.tripsGampaha.indexOf(item), this.id);
    }

    if(this.locationone == 'Hambanthota')
    {
      this.tripsHambanthota.splice(this.tripsHambanthota.indexOf(item), this.id);
    }

    if(this.locationone == 'Jaffna')
    {
      this.tripsJaffna.splice(this.tripsJaffna.indexOf(item), this.id);
    }

    if(this.locationone == 'Kaluthara')
    {
      this.tripsKaluthara.splice(this.tripsKaluthara.indexOf(item), this.id);
    }

    if(this.locationone == 'Kandy' || this.poplocationone == 'Kandy')
    {
      this.tripsKandy.splice(this.tripsKandy.indexOf(item), this.id);
    }

    if(this.locationone == 'Kagalle')
    {
      this.tripsKagalle.splice(this.tripsKagalle.indexOf(item), this.id);
    }

    if(this.locationone == 'Kilinochchi')
    {
      this.tripsKilinochchi.splice(this.tripsKilinochchi.indexOf(item), this.id);
    }
    
    if(this.locationone == 'Kurunegala')
    {
      this.tripsKurunegala.splice(this.tripsKurunegala.indexOf(item), this.id);
    }
    
    if(this.locationone == 'Mannar')
    {
      this.tripsMannar.splice(this.tripsMannar.indexOf(item), this.id);
    }

    if(this.locationone == 'Mathale')
    {
      this.tripsMathale.splice(this.tripsMathale.indexOf(item), this.id);
    }

    if(this.locationone == 'Mathara')
    {
      this.tripsMathara.splice(this.tripsMathara.indexOf(item), this.id);
    }

    if(this.locationone == 'Monaragala')
    {
      this.tripsMonaragala.splice(this.tripsMonaragala.indexOf(item), this.id);
    }

    if(this.locationone == 'Mullathivu')
    {
      this.tripsMullathivu.splice(this.tripsMullathivu.indexOf(item), this.id);
    }

    if(this.locationone == 'NuwaraEliya')
    {
      this.tripsNuwaraEliya.splice(this.tripsNuwaraEliya.indexOf(item), this.id);
    }

    if(this.locationone == 'Polonnaruwa')
    {
      this.tripsPolonnaruwa.splice(this.tripsPolonnaruwa.indexOf(item), this.id);
    }

    if(this.locationone == 'Puttalam')
    {
      this.tripsPuttalam.splice(this.tripsPuttalam.indexOf(item), this.id);
    }

    if(this.locationone == 'Rathnapura')
    {
      this.tripsRathnapura.splice(this.tripsRathnapura.indexOf(item), this.id);
    }
   
    if(this.locationone == 'Trincomalee')
    {
      this.tripsTrincomalee.splice(this.tripsTrincomalee.indexOf(item), this.id);
    }

    if(this.locationone == 'Vavuniya')
    {
      this.tripsVavuniya.splice(this.tripsVavuniya.indexOf(item), this.id);
    }
  }
}
