const db = require('./db');

// a. Get all employees
async function getAllEmployees() {
  const [rows] = await db.query('SELECT * FROM employees');
  console.log(rows);
}

// b. Get single employee by ID
async function getEmployeeById(id) {
  const [rows] = await db.query('SELECT * FROM employees WHERE employee_id = ?', [id]);
  console.log(rows[0]);
}

// Add a new employee & return all
async function addEmployee(emp) {
  const { first_name, last_name, email, phone_number, department, salary } = emp;
  await db.query(
    'INSERT INTO employees (first_name, last_name, email, phone_number, department, salary) VALUES (?, ?, ?, ?, ?, ?)',
    [first_name, last_name, email, phone_number, department, salary]
  );
  await getAllEmployees();
}

// d. Delete employee by ID & return all
async function deleteEmployee(id) {
  await db.query('DELETE FROM employees WHERE employee_id = ?', [id]);
  await getAllEmployees();
}

// e. Update employee & return new data
async function updateEmployee(id, emp) {
  const { first_name, last_name, email, phone_number, department, salary } = emp;
  await db.query(
    `UPDATE employees SET 
     first_name = ?, last_name = ?, email = ?, phone_number = ?, department = ?, salary = ?
     WHERE employee_id = ?`,
    [first_name, last_name, email, phone_number, department, salary, id]
  );
  await getEmployeeById(id);
}

  getAllEmployees();
  getEmployeeById(2);
  addEmployee({ first_name: 'Lebo', last_name: 'Khumalo', email: 'lebo@example.com', phone_number: '555-0000', department: 'Support', salary: 72000 });
  updateEmployee(1, { first_name: 'Johnny', last_name: 'Doe', email: 'johnny.doe@example.com', phone_number: '555-9999', department: 'Engineering', salary: 86000 });
  deleteEmployee(3);