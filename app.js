const loadDrinks = (name) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
      .then((res) => res.json())
      .then((data) => DisplayDrinks(data.drinks))
      .catch((err) => console.log(err));
  };
  window.onload = () => {
    loadDrinks("margarita");
  };
  
  const drinksContainer = document.getElementById("drinks-container");
  const drinkSearch = () => {
    const drinkInput = document.getElementById("drink-input").value;
    if (drinkInput.length > 0) drinksContainer.innerText = "";
    if (drinkInput) loadDrinks(drinkInput);
    document.getElementById("drink-input").value = "";
  };
  const DisplayDrinks = (data) => {
    if (data) {
      data.forEach((drink) => {
        const div = document.createElement("div");
        div.classList.add("co-12");
        div.classList.add("col-md-6");
        div.classList.add("col-xl-4");
        div.innerHTML = `
                <div class="card">
                    <img src="${
                      drink.strDrinkThumb
                    }" class="card-img-top" alt="Image">
                    <div class="card-body">
                        <h2 class="card-title">Name : ${drink.strGlass}</h2>
                        <h4 class="card-text"><b>Category :</b> ${
                          drink.strCategory
                        }</h4>
                        <p class="card-text"><b>Details :</b> ${drink.strInstructions.slice(
                          0,
                          15
                        )}...</p>
                        <button onclick="handleAddCart('${drink.strGlass}',
                          '${drink.strDrinkThumb}')"
                        class="btn button-c">Add To Cart</button>
                        <button onclick="handleModal('${
                          drink.idDrink
                        }')" class="btn button-c"
                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                        >Details</button>
                    </div>
                </div>
            `;
        drinksContainer.appendChild(div);
      });
    } else {
      drinksContainer.innerHTML = `<h1 class="not-found">Sorry, No Drinks found!!!</h1>`;
    }
  };
  const countOrder = document.getElementById("total-cart").innerText;
  let countCart = parseInt(countOrder);
  const handleAddCart = (name, image) => {
    if (countCart < 7) {
      countCart++;
      document.getElementById("total-cart").innerText = countCart;
  
      const cartContainer = document.getElementById("cart-container");
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <th scope="row">${countCart}</th>
        <td><img class="cart-imag" src="${image}" class="card-img-top" alt="Image"></td>
        <td>${name.slice(0, 15)}..</td>
    `;
      cartContainer.appendChild(tr);
    } else alert("Sorry, You have reached the maximum limit !!!");
  };
  const handleModal = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => drinkDetailsModal(...data.drinks))
      .catch((err) => console.log(err));
  };
  
  const drinkDetailsModal = (data) => {
    const modalTitle = document.getElementById("modal-title");
    const modalInfo = document.getElementById("modal-info");
    modalTitle.innerText = `Name: ${data.strGlass}`;
    modalInfo.innerHTML = `
        <img class="img-fluid" src="${data.strDrinkThumb}" alt="Image">
        <h4>Details:</h4>
        <h5 class="">Category: ${data.strCategory}</h5>
        <h5 class="">Alcoholic: ${data.strAlcoholic}</h5>
        <p class="">${data.strInstructions}</p>
    `;
  };