import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public result:any;
  constructor(private sqlite: SQLite,private backgroundMode: BackgroundMode) { 
  }
  enableBackgroundMode() {
    this.backgroundMode.enable();

    this.backgroundMode.on('activate').subscribe(() => {
      console.log('Background mode activated');
      // Perform tasks that need to run in the background
    });

    this.backgroundMode.on('deactivate').subscribe(() => {
      console.log('Background mode deactivated');
      // Perform tasks that need to run when returning to foreground
    });

    this.backgroundMode.on('failure').subscribe(error => {
      console.error('Background mode failed', error);
    });
  }
  async createTables(tableName: string, columns: string) {
    const query = 'CREATE TABLE IF NOT EXISTS '+tableName+' ('+columns+')';
    return new Promise((resolve, reject) => {
      this.sqlite.create({name:  'chat.db', location: 'default'}).then((db: SQLiteObject) => {
        db.executeSql(query, []).then((data) => {
          return this.result = resolve(data);
        }).catch(error => {
          return this.result = resolve('2');
        });
      }).catch(error => {
        return this.result = resolve('3');
      });
    }).catch(error =>{
      return "4";
    });
  }
  async insertItem(tableName: string, columns: string, values: any[]) {
    const placeholders = values.map(() => '?').join(',');
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
    return new Promise((resolve, reject) => {
      this.sqlite.create({name:  'chat.db', location: 'default'}).then((db: SQLiteObject) => {
        db.executeSql(query, values).then((data) => {
          return this.result = resolve(data);
        }).catch(error => {
          return this.result = resolve('2');
        });
      }).catch(error => {
        return this.result = resolve('3');
      });
    }).catch(error => {
      return "4";
    });
  }
  async updateItem(tableName: string, updates: string, condition: string, params: any[]) {
    const query = `UPDATE ${tableName} SET ${updates} WHERE ${condition}`;
    return new Promise((resolve, reject) => {
      this.sqlite.create({name:  'chat.db', location: 'default'}).then((db: SQLiteObject) => {
        db.executeSql(query, params).then((data) => {
          return this.result = resolve(data);
        }).catch(error => {
          return this.result = resolve('2');
        });
      }).catch(error => {
        return this.result = resolve('3');
      });
    }).catch(error => {
      return "4";
    });
  }
  async selectItems(tableName: string, condition: string = 'NULL', params: any[]) {
    let query = "";
      if(condition == 'NULL')
        query = `SELECT * FROM ${tableName}`;
      else
        query = `SELECT * FROM ${tableName} WHERE ${condition}`;
    return new Promise((resolve, reject) => {
      this.sqlite.create({name:  'chat.db', location: 'default'}).then((db: SQLiteObject) => {
        db.executeSql(query, params).then((data) => {
          return this.result = resolve(data);
        }).catch(error => {
          return this.result = resolve('2');
        });
      }).catch(error => {
        return this.result = resolve('3');
      });
    }).catch(error => {
      return "4";
    });
  }














  //tableName,columns,values
  //'new_items', 'name, price, quantity', ['Widget', 25.99, 10]
//   public insertItem(tableName: string, columns: string, values: any[]) {
//     const placeholders = values.map(() => '?').join(',');
//     const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
//     this.getDatabase().then((db: SQLiteObject) => {
//       db.executeSql(query, values)
//         .then(() => console.log('Inserted Item'))
//         .catch(e => console.log(e));
//     });
//   }
//   //tableName,updates,condition,params
// //'new_items', 'price = ?', 'name = ?', [29.99, 'Widget']
//   public updateItem(tableName: string, updates: string, condition: string, params: any[]) {
//     const query = `UPDATE ${tableName} SET ${updates} WHERE ${condition}`;
//     this.getDatabase().then((db: SQLiteObject) => {
//       db.executeSql(query, params)
//         .then(() => console.log('Updated Item'))
//         .catch(e => console.log(e));
//     });
//   }
//   //'new_items', 'price > ?', [20]
//   public selectItems(tableName: string, condition: string, params: any[]) {
//     const query = `SELECT * FROM ${tableName} WHERE ${condition}`;
//     this.getDatabase().then((db: SQLiteObject) => {
//       db.executeSql(query,params)
//         .then((res) => {
//           let items = [];
//           for (let i = 0; i < res.rows.length; i++) {
//             items.push(res.rows.item(i));
//           }
//           return items;
//         })
//         .catch(e => console.log(e));
//     });
//   }
 }
