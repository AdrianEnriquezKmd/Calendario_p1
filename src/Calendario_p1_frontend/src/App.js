import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './path/to/your/ActivitiesCalendar.did.js'; // Importa el archivo .did.js generado por dfx
import { Principal } from '@dfinity/principal';

const agent = new HttpAgent();
const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId: Principal.fromText('tu_canister_id_aqui'), // Reemplaza 'tu_canister_id_aqui' con el ID de tu canister
});

document.getElementById('root').innerHTML = `
  <h1>Calendario de Actividades</h1>
  <form id="activityForm">
    <label for="activityName">Nombre de la actividad:</label>
    <input type="text" id="activityName" required>
    <label for="activityDescription">Descripción:</label>
    <input type="text" id="activityDescription" required>
    <label for="activityDate">Fecha (dd/mm/yyyy):</label>
    <input type="text" id="activityDate" required>
    <button type="submit">Agregar Actividad</button>
  </form>
  <div id="output"></div>
`;

document.getElementById('activityForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const activityName = document.getElementById('activityName').value;
  const activityDescription = document.getElementById('activityDescription').value;
  const activityDate = document.getElementById('activityDate').value;

  try {
    const currentUser = await actor.getUser();
    const datosFecha = parseDate(activityDate);
    const info = { name: activityName, activity: activityName, description: activityDescription, note: "" };

    const savedActivity = await actor.saveActivity(currentUser, datosFecha, info);
    document.getElementById('output').innerHTML = `Actividad agregada: ${JSON.stringify(savedActivity)}`;
  } catch (error) {
    console.error('Error al agregar actividad:', error);
  }
});

function parseDate(dateString) {
  const [day, month, year] = dateString.split('/');
  return { id: 1, day: Number(day), month: Number(month), year: Number(year) };
}