    const le3o8x = "Valami012345678";
    const apiUrl = "http://gamf.nhely.hu/ajax2/";

    // Szerver oldali adatlekérés
    function fetchData() {
      const httpRequest = new XMLHttpRequest();
      document.getElementById("le3o8x").innerHTML = "Code: " + le3o8x;
      httpRequest.open("POST", apiUrl, true);
      httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      let params = "code=" + le3o8x + "&op=read";

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          let response = JSON.parse(httpRequest.responseText);
          let records = response.list;
          let output = "<h1>Records</h1><p>Total: " + response.rowCount + "</p><table><tr><th>ID</th><th>Name</th><th>Height</th><th>Weight</th></tr>";
          records.forEach(record => {
            output += `<tr><td>${record.id}</td><td>${record.name}</td><td>${record.height}</td><td>${record.weight}</td></tr>`;
          });
          output += "</table>";
          document.getElementById("dataDisplay").innerHTML = output;
        }
      };
      httpRequest.send(params);
    }

    // Hozzáadás
    function addRecord() {
      const name = document.getElementById("inputName").value;
      const height = document.getElementById("inputHeight").value;
      const weight = document.getElementById("inputWeight").value;

      if (name && height && weight) {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", apiUrl, true);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        const params = `code=${le3o8x}&op=create&name=${name}&height=${height}&weight=${weight}`;

        httpRequest.onreadystatechange = () => {
          if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            document.getElementById("addResult").innerHTML =
              httpRequest.responseText.trim() === "1" ? "Sikeres hozzáadás!" : "Hiba történt!";
            fetchData();
          }
        };

        httpRequest.send(params);
      }
    }

    // Szerkesztés
    function updateRecord() {
      const id = document.getElementById("editId").value;
      const name = document.getElementById("editName").value;
      const height = document.getElementById("editHeight").value;
      const weight = document.getElementById("editWeight").value;

      if (id && name && height && weight) {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", apiUrl, true);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        const params = `code=${le3o8x}&op=update&id=${id}&name=${name}&height=${height}&weight=${weight}`;

        httpRequest.onreadystatechange = () => {
          if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            document.getElementById("editResult").innerHTML =
              httpRequest.responseText.trim() === "1" ? "Sikeres frissítés!" : "Frissítés hiba!";
            fetchData();
          }
        };

        httpRequest.send(params);
      }
    }

    // Törlés
    function deleteRecord() {
      const id = document.getElementById("removeId").value;

      if (id) {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", apiUrl, true);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        const params = `code=${le3o8x}&op=delete&id=${id}`;

        httpRequest.onreadystatechange = () => {
          if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            document.getElementById("removeResult").innerHTML =
              httpRequest.responseText.trim() === "1" ? "Sikeres törlés!" : "Törlés hiba!";
            fetchData();
          }
        };

        httpRequest.send(params);
      }
    }

    // Record keresés (Szerkesztés előtt)
    function fetchRecord() {
      const id = document.getElementById("editId").value;

      if (id) {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", apiUrl, true);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        const params = `code=${le3o8x}&op=read`;

        httpRequest.onreadystatechange = () => {
          if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            let records = response.list;
            let found = records.find(record => record.id == id);

            if (found) {
              document.getElementById("editName").value = found.name;
              document.getElementById("editHeight").value = found.height;
              document.getElementById("editWeight").value = found.weight;
            } else {
              document.getElementById("editResult").innerHTML = "Record not found!";
            }
          }
        };

        httpRequest.send(params);
      } else {
        document.getElementById("editResult").innerHTML = "Please enter an ID!";
      }
    }

    // Adatok betöltése oldalbetöltéskor
    window.onload = fetchData;