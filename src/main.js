import "./style.css";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { faker } from '@faker-js/faker/locale/es';

document.querySelector("#app").innerHTML = `
    <nav>
      <p class="welcome">Log in to get started</p>
      <form class="login" >
        <input
          type="text"
          placeholder="user"
          class="login__input login__input--user"
        />
        <!-- In practice, use type="password" -->
        <input
          type="text"
          placeholder="PIN"
          maxlength="4"
          class="login__input login__input--pin"
        />
        <button class="login__btn">&rarr;</button>
      </form>
    </nav>
    <main class="app">
      <!-- BALANCE -->
      <div class="balance">
        <div>
          <p class="balance__label">Current balance</p>
          <p class="balance__date">
            As of <span class="date">05/03/2037</span>
          </p>
        </div>
        <p class="balance__value">0000€</p>
      </div>
      <!-- MOVEMENTS -->
      <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--deposit">2 deposit</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">4 000€</div>
        </div>
        <div class="movements__row">
          <div class="movements__type movements__type--withdrawal">
            1 withdrawal
          </div>
          <div class="movements__date">24/01/2037</div>
          <div class="movements__value">-378€</div>
        </div>
      </div>
      <!-- SUMMARY -->
      <div class="summary">
        <p class="summary__label">In</p>
        <p class="summary__value summary__value--in">0000€</p>
        <p class="summary__label">Out</p>
        <p class="summary__value summary__value--out">0000€</p>
        <p class="summary__label">Interest</p>
        <p class="summary__value summary__value--interest">0000€</p>
        <button class="btn--sort">&downarrow; SORT</button>
      </div>
      <!-- OPERATION: TRANSFERS -->
      <div class="operation operation--transfer">
        <h2>Transfer money</h2>
        <form class="form form--transfer">
          <input type="text" class="form__input form__input--to" />
          <input type="number" class="form__input form__input--amount" />
          <button class="form__btn form__btn--transfer">&rarr;</button>
          <label class="form__label">Transfer to</label>
          <label class="form__label">Amount</label>
        </form>
      </div>
      <!-- OPERATION: LOAN -->
      <div class="operation operation--loan">
        <h2>Request loan</h2>
        <form class="form form--loan">
          <input type="number" class="form__input form__input--loan-amount" />
          <button class="form__btn form__btn--loan">&rarr;</button>
          <label class="form__label form__label--loan">Amount</label>
        </form>
      </div>
      <!-- OPERATION: CLOSE -->
      <div class="operation operation--close">
        <h2>Close account</h2>
        <form class="form form--close">
          <input type="text" class="form__input form__input--user" />
          <input
            type="password"
            maxlength="6"
            class="form__input form__input--pin"
          />
          <button class="form__btn form__btn--close">&rarr;</button>
          <label class="form__label">Confirm user</label>
          <label class="form__label">Confirm PIN</label>
        </form>
      </div>
      <!-- LOGOUT TIMER -->
      <p class="logout-timer">
        You will be logged out in <span class="timer">05:00</span>
      </p>
    </main>
    <div class="random-account-container">
      <button class="btn--random-account">Generar Cuenta Aleatoria</button>
      <div class="random-account-info" style="display: none;"></div>
    </div>
`;
// Data
const account1 = {
  owner: "Juan Sánchez",
  movements: [
    { amount: 200, date: new Date('2024-03-01') },
    { amount: 450, date: new Date('2024-03-02') },
    { amount: -400, date: new Date('2024-03-03') },
    { amount: 3000, date: new Date('2024-03-04') },
    { amount: -650, date: new Date('2024-03-05') },
    { amount: -130, date: new Date('2024-03-06') },
    { amount: 70, date: new Date('2024-03-07') },
    { amount: 1300, date: new Date('2024-03-08') }
  ],
  interestRate: 1.2,
  pin: 1111,
};
const account2 = {
  owner: "María Portazgo",
  movements: [
    { amount: 5000, date: new Date('2024-03-01') },
    { amount: 3400, date: new Date('2024-03-02') },
    { amount: -150, date: new Date('2024-03-03') },
    { amount: -790, date: new Date('2024-03-04') },
    { amount: -3210, date: new Date('2024-03-05') },
    { amount: -1000, date: new Date('2024-03-06') },
    { amount: 8500, date: new Date('2024-03-07') },
    { amount: -30, date: new Date('2024-03-08') }
  ],
  interestRate: 1.5,
  pin: 2222,
};
const account3 = {
  owner: "Estefanía Pueyo",
  movements: [
    { amount: 200, date: new Date('2024-03-01') },
    { amount: -200, date: new Date('2024-03-02') },
    { amount: 340, date: new Date('2024-03-03') },
    { amount: -300, date: new Date('2024-03-04') },
    { amount: -20, date: new Date('2024-03-05') },
    { amount: 50, date: new Date('2024-03-06') },
    { amount: 400, date: new Date('2024-03-07') },
    { amount: -460, date: new Date('2024-03-08') }
  ],
  interestRate: 0.7,
  pin: 3333,
};
const account4 = {
  owner: "Javier Rodríguez",
  movements: [
    { amount: 430, date: new Date('2024-03-01') },
    { amount: 1000, date: new Date('2024-03-02') },
    { amount: 700, date: new Date('2024-03-03') },
    { amount: 50, date: new Date('2024-03-04') },
    { amount: 90, date: new Date('2024-03-05') }
  ],
  interestRate: 1,
  pin: 4444,
};

// Función para generar una cuenta con datos aleatorios
const generateRandomAccount = function() {
  // Asegurar que el nombre y apellido sean de una sola palabra
  const firstName = faker.person.firstName().split(' ')[0];
  const lastName = faker.person.lastName().split(' ')[0];
  const owner = `${firstName} ${lastName}`;
  
  // Generar entre 5 y 10 movimientos aleatorios
  const numMovements = faker.number.int({ min: 5, max: 10 });
  const movements = [];
  
  // Fecha base para los movimientos (últimos 30 días)
  const today = new Date();
  
  for (let i = 0; i < numMovements; i++) {
    // Generar una fecha aleatoria en los últimos 30 días
    const movementDate = new Date(today);
    movementDate.setDate(today.getDate() - faker.number.int({ min: 0, max: 30 }));
    
    // Generar un monto aleatorio entre -1000 y 5000
    const amount = faker.number.int({ min: -1000, max: 5000 });
    
    movements.push({ amount, date: movementDate });
  }
  
  // Generar un PIN aleatorio de 4 dígitos
  const pin = faker.number.int({ min: 1000, max: 9999 });
  
  // Generar una tasa de interés aleatoria entre 0.5 y 2.0
  const interestRate = parseFloat(faker.number.float({ min: 0.5, max: 2.0, precision: 0.1 }).toFixed(1));
  
  return {
    owner,
    movements,
    interestRate,
    pin,
  };
};

// Generar una cuenta aleatoria adicional
const account5 = generateRandomAccount();

const accounts = [account1, account2, account3, account4, account5];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
// Variables para el temporizador de cierre de sesión
let currentAccount, timer;
// Variables para el estado de ordenamiento
let sorted = false;
let sortDirection = 'desc'; // 'asc' o 'desc'

// Asegurarnos de que la interfaz esté oculta al inicio
containerApp.style.opacity = 0;

// Crear los usernames para las cuentas
const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner // Juan Sanchez
      .toLowerCase() //  juan sanchez
      .split(" ") // ['juan', 'sanchez']
      .map((name) => name[0]) // ['j', 's']
      .join(""); // js
  });
};
createUsernames(accounts);

// Mostrar la fecha actual
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
labelDate.textContent = `${day}/${month}/${year}`;

// Función para iniciar el temporizador de cierre de sesión
const startLogoutTimer = function() {
  const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    
    // En cada tick, actualizar el temporizador en la UI
    labelTimer.textContent = `${min}:${sec}`;
    
    // Cuando llegue a 0, cerrar sesión
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    
    // Decrementar el tiempo
    time--;
  };
  
  // Establecer tiempo a 5 minutos
  let time = 300;
  
  // Llamar al tick cada segundo
  tick();
  timer = setInterval(tick, 1000);
  
  return timer;
};

// Función para resetear el temporizador
const resetLogoutTimer = function() {
  clearInterval(timer);
  startLogoutTimer();
};

// Modificar el event listener de login para simplificar
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  
  const inputUsername = inputLoginUsername.value;
  const inputPin = Number(inputLoginPin.value);
  currentAccount = accounts.find(
    (account) => account.username === inputUsername
  );

  if (!currentAccount) {
    alert('Error: No se encontró la cuenta. Por favor, verifique el nombre de usuario.');
    return;
  }

  if (currentAccount.pin !== inputPin) {
    alert('Error: PIN incorrecto. Por favor, intente nuevamente.');
    return;
  }

  // Si llegamos aquí, las credenciales son correctas
  // Limpiar formulario
  inputLoginUsername.value = inputLoginPin.value = "";
  
  // Iniciar el temporizador de cierre de sesión
  if (timer) clearInterval(timer);
  startLogoutTimer();
  
  // Actualizar toda la interfaz
  updateUI(currentAccount);
});

const updateUI = function (account) {
  // Mostrar la interfaz
  containerApp.style.opacity = 1;
  
  // Actualizar mensaje de bienvenida
  labelWelcome.textContent = `Welcome back, ${account.owner.split(" ")[0]}`;
  
  // Mostrar los movimientos de la cuenta
  displayMovements(account.movements);
  
  // Mostrar el balance de la cuenta
  displayBalance(account.movements);
  
  // Mostrar el total de los movimientos de la cuenta
  // ingresos y gastos
  displaySummary(account.movements);
};

// Función para mostrar los movimientos
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  
  let movs = movements.slice();
  
  if (sorted) {
    movs.sort((a, b) => {
      if (sortDirection === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  }
  
  movs.forEach(function(mov, i) {
    const type = mov.amount > 0 ? 'deposit' : 'withdrawal';
    
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${formatDistanceToNow(mov.date, { addSuffix: true, locale: es })}</div>
        <div class="movements__value">${mov.amount.toFixed(2)}€</div>
      </div>
    `;
    
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = function (movements) {
  // calculamos suma de ingresos y retiradas de efectivo
  const balance = movements.reduce((total, movement) => total + movement.amount, 0);
  // actualizamos el DOM:
  labelBalance.textContent = `${balance.toFixed(2)} €`;
};
const displaySummary = function (movements) {
  const sumIn = movements
    .filter((movement) => movement.amount > 0)
    .reduce((total, movement) => total + movement.amount, 0);
  labelSumIn.textContent = `${sumIn.toFixed(2)} €`;
  const sumOut = movements
    .filter((movement) => movement.amount < 0)
    .reduce((total, movement) => total + movement.amount, 0);
  labelSumOut.textContent = `${sumOut.toFixed(2)} €`;
};

// Función para validar si hay un depósito que supere el 10% del monto solicitado
const hasValidDeposit = function(movements, loanAmount) {
  return movements.some(movement => 
    movement.amount > 0 && movement.amount >= loanAmount * 0.1
  );
};

// Event listener para el botón de préstamo
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  resetLogoutTimer();
  
  const loanAmount = Number(inputLoanAmount.value);
  
  // Validar que el monto sea positivo
  if (loanAmount <= 0) {
    alert('Por favor, ingrese un monto válido mayor a 0');
    return;
  }

  // Calcular el balance actual
  const currentBalance = currentAccount.movements.reduce((total, movement) => total + movement.amount, 0);
  
  // Verificar que el préstamo no supere el 200% del balance
  if (loanAmount > currentBalance * 2) {
    alert(`El préstamo no puede superar el 200% de su balance actual (${(currentBalance * 2).toFixed(2)}€)`);
    return;
  }

  // Verificar si hay un depósito válido
  if (hasValidDeposit(currentAccount.movements, loanAmount)) {
    // Agregar el préstamo a los movimientos
    currentAccount.movements.push({ amount: loanAmount, date: new Date() });
    
    // Actualizar la interfaz
    updateUI(currentAccount);
    
    // Limpiar el formulario
    inputLoanAmount.value = '';
    
    alert(`¡Préstamo de ${loanAmount.toFixed(2)}€ aprobado!`);
  } else {
    alert('Lo sentimos, necesita tener al menos un depósito que supere el 10% del monto solicitado');
  }
});

// Event listener para el botón de transferencia
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  resetLogoutTimer();
  
  const amount = Number(inputTransferAmount.value);
  const recipientUsername = inputTransferTo.value;
  
  // Validar que el monto sea positivo
  if (amount <= 0) {
    alert('Por favor, ingrese un monto válido mayor a 0');
    return;
  }

  // Obtener la cuenta del destinatario
  const recipientAccount = accounts.find(acc => 
    acc.username === recipientUsername
  );

  if (!recipientAccount) {
    alert('Error: No se encontró la cuenta del destinatario');
    return;
  }

  // Verificar que haya suficiente saldo
  const currentBalance = currentAccount.movements.reduce((total, movement) => total + movement.amount, 0);
  if (currentBalance < amount) {
    alert('Lo sentimos, no tiene suficiente saldo para realizar esta transferencia');
    return;
  }

  // Realizar la transferencia
  currentAccount.movements.push({ amount: -amount, date: new Date() });
  recipientAccount.movements.push({ amount: amount, date: new Date() });
  
  // Limpiar el formulario
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  
  // Actualizar la interfaz
  updateUI(currentAccount);
  
  alert('Transferencia realizada con éxito');
});

// Event listener para el botón de cerrar cuenta
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    
    // Eliminar cuenta
    accounts.splice(index, 1);

    // Ocultar UI
    containerApp.style.opacity = 0;
    
    // Mostrar mensaje de confirmación
    labelWelcome.textContent = 'Cuenta cerrada correctamente. ¡Gracias por confiar en nosotros!';
  } else {
    labelWelcome.textContent = 'Credenciales incorrectas. No se pudo cerrar la cuenta.';
  }

  // Limpiar campos
  inputCloseUsername.value = inputClosePin.value = '';
});

// Event listener para el botón de ordenamiento
btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Si ya está ordenado, cambiar la dirección
  if (sorted) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    // Si no está ordenado, activar el ordenamiento en dirección descendente por defecto
    sorted = true;
    sortDirection = 'desc';
  }
  
  // Actualizar el texto del botón para indicar la dirección de ordenamiento
  if (sorted) {
    btnSort.innerHTML = sortDirection === 'asc' 
      ? '&uarr; ORDENADO (Más antiguo primero)' 
      : '&darr; ORDENADO (Más reciente primero)';
  } else {
    btnSort.innerHTML = '&darr; ORDENAR';
  }
  
  displayMovements(currentAccount.movements);
});

// Event listener para el botón de generar cuenta aleatoria
document.querySelector('.btn--random-account').addEventListener('click', function(e) {
  e.preventDefault();
  
  // Generar una cuenta aleatoria
  const randomAccount = generateRandomAccount();
  
  // Crear el nombre de usuario (iniciales)
  randomAccount.username = randomAccount.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  
  // Añadir la cuenta al array de cuentas disponibles
  accounts.push(randomAccount);
  
  const randomAccountInfo = document.querySelector('.random-account-info');
  
  randomAccountInfo.style.display = 'block';
  randomAccountInfo.innerHTML = `
    <p><strong>Cuenta generada con éxito</strong></p>
    <p>Nombre del propietario: ${randomAccount.owner}</p>
    <p>Usuario (iniciales): <strong>${randomAccount.username}</strong></p>
    <p>PIN: <strong>${randomAccount.pin}</strong></p>
    <p>Tasa de interés: ${randomAccount.interestRate}%</p>
    <p>Movimientos:</p>
    <ul>
      ${randomAccount.movements.map(movement => `
        <li>${movement.amount}€ - ${formatDistanceToNow(movement.date, { addSuffix: true, locale: es })}</li>
      `).join('')}
    </ul>
    <p class="random-account-note">Puedes iniciar sesión con el usuario <strong>${randomAccount.username}</strong> y el PIN <strong>${randomAccount.pin}</strong></p>
  `;
});