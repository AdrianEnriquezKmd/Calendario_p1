// Importaciones de módulos necesarios
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

// Definición del actor ActivitiesCalendar
actor ActivitiesCalendar {

  // Definición de tipos de datos
  type User = Principal;

  type DatosFecha = {
    id : Nat;
    year : Nat;
    month: Nat;
    day: Nat;
  };

  type Info = {
    name: Text;
    activity : Text;
    description : Text;
    note: Text;
  };

  type Activity = HashMap.HashMap<Text, Info>;

  // Inicialización del calendario de actividades
  var calendar = HashMap.HashMap<User, Activity>(0, Principal.equal, Principal.hash);

  // Función para obtener el usuario que realiza la llamada
  public shared(msg) func getUser() : async Principal {
    let currentUser = msg.caller;
    return currentUser;
  };

  // Función para agregar una nueva actividad al calendario
  public shared (msg) func saveActivity(datosFecha: DatosFecha, info: Info) : async Info {
    let user : Principal = msg.caller;
    let fecha : Text = Nat.toText(datosFecha.day) #"/"# Nat.toText(datosFecha.month) #"/"# Nat.toText(datosFecha.year) #"/"# Nat.toText(datosFecha.id);
    let resultActivity = calendar.get(user);

    var finalActivity : Activity = switch resultActivity {
      case (null) {
        HashMap.HashMap(0, Text.equal, Text.hash);
      };
      case (?resultActivity) resultActivity;
    };

    finalActivity.put(fecha, info);
    calendar.put(user, finalActivity);

    Debug.print("Tu actividad fue agregada correctamente, <<" # Principal.toText(user) # ">> gracias! :)");
    return info;
  };

  // Función para obtener la información de una actividad en una fecha específica
  public shared func getActivity(user: Principal, fecha: Text) : async ?Info {
    let resultActivity = calendar.get(user);

    switch resultActivity {
      case (?activity) {
        activity.get(fecha);
      };
      case (null) null;
    }
  };

  public query func getActivitys(user : User) : async [(Text,Info)] {
    let result = calendar.get(user);

    var resultsActivity : Activity = switch result {
    case (null) {
      HashMap.HashMap<Text, Info>(0, Text.equal, Text.hash);
    };
    case (?result) result;
  };

  // Convertir las entradas del mapa en una secuencia
  let activityEntries = Iter.toArray<(Text, Info)>(resultsActivity.entries());

  return activityEntries;
  };


  // Función para actualizar la información de una actividad en una fecha específica
  public shared (_msg) func updateActivity(user: Principal, fecha: Text, newInfo: Info) : async Bool {
    let resultActivity = calendar.get(user);

    switch resultActivity {
      case (?activity) {
        if (activity.get(fecha) != null) {
          activity.put(fecha, newInfo);
          calendar.put(user, activity);
          Debug.print("Actividad actualizada correctamente");
          true;
        } else {
          Debug.print("La actividad no existe para la fecha proporcionada");
          false;
        };
      };
      case (null) {
        Debug.print("No hay actividades registradas para este usuario");
        false;
      };
    }
  };

  // Función para eliminar una actividad en una fecha específica
  public shared (_msg) func deleteActivity(user: Principal, fecha: Text) : async Bool {
    let resultActivity = calendar.get(user);

    switch resultActivity {
      case (?activity) {
        if (activity.get(fecha) != null) {
          activity.delete(fecha);
          calendar.put(user, activity);
          Debug.print("Actividad eliminada correctamente");
          true;
        } else {
          Debug.print("La actividad no existe para la fecha proporcionada");
          false;
        };
      };
      case (null) {
        Debug.print("No hay actividades registradas para este usuario");
        false;
      };
    }
  };
};