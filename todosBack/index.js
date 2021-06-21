const express = require('express');
const fs = require('fs');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());
const PORT = 8000;

// C
server.post('/', (req, res,) => {
  const body = req.body; // тело запроса в переменную body
  console.log('body: ', body); // проверка
  fs.readFile('./todos.json', (err, data) => {
    const db = JSON.parse(data);
    console.log('data:', data.todos); // проверка
    data.todos.push(req.body); // закидываем в конец массива todos из todos.json

    fs.writeFile('./todos.json', JSON.stringify(db), (err) => {
      if (err) {
        console.log('error', err)
      } 
      else {
        res.send(db)
      }
    });
  });
});
// R
server.get('/', (req, res,) => {
  fs.readFile('./todos.json', (err, data) => {
    res.send(JSON.parse(data));
    },
  );
});
// U
server.patch('/', (req, res) => {
  fs.readFile('./todos.json', 'utf-8', (err, data) => {
    const db = JSON.parse(data);
    console.log('data:', db.todos);
    const index = db.todos.findIndex((todo) => req.body.id === todo.id);
    db.todos[index].complecated = !db.todos[index].complecated;

    fs.writeFile('./todos.json', JSON.stringify(db), (err) => {
      if (err) {
        console.log('error', err)
      } 
      else {
        res.send(db)
      }
    });
  })
})
// D
server.delete('/', (req, res) => {
  fs.readFile('./todos.json', 'utf-8', (err, data) => {
    const db = JSON.parse(data);
    console.log('data:', db.todos);
    const newTodos = db.todos.filter((todo) => req.body.id !== todo.id);
    db.todos = newTodos;

    fs.writeFile('./todos.json', JSON.stringify(db), (err) => {
      if (err) {
        console.log('error', err)
      } 
      else {
        res.send(db)
      }
    });
  })
})


server.listen(PORT, () => {
  console.log('server server');
});









// const express = require('express');
// const fs = require('fs');

// const server = express();
// server.use(express.json());

// // R
// server.get('/', (req, res,) => {
//   fs.readFile(
//     './todos.json',
//     'utf-8',
//     (err, data) => {
//       res.send(JSON.parse(data));
//     },
//   );
// });

// // C
// server.post('/', (req, res,) => {
//   const body = req.body;
//   console.log('body: ', body);
//   fs.readFile(
//     './todos.json',
//     (err, data) => {
//       const db = JSON.parse(data);
//       const id = Date.now();
//       db.todos[id] = { ...req.body };
        
//       fs.writeFile(
//         './todos.json',
//         JSON.stringify(db),
//         (err) => {
//           if (err) {
//             console.log('error', err)
//           } else {
//             res.send(db)
//           }
//         }
//       );
        
//     });
//   },
// );

// // U
// server.put('/', (req, res,) => {
//   fs.readFile(
//     './todos.json',
//     // 'utf-8',
//     (err, data) => {
//       res.send(JSON.parse(data));
//     },
//   );
// });

// // D
// server.delete('/', (req, res,) => {
//   fs.readFile(
//     './todos.json',
//     // 'utf-8',
//     (err, data) => {
//       res.send(JSON.parse(data));
//     },
//   );
// });

  

// server.listen(8000, () => {
//   console.log('server server');
// });
