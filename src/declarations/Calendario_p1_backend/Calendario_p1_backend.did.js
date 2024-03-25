export const idlFactory = ({ IDL }) => {
  const Info = IDL.Record({
    'name' : IDL.Text,
    'note' : IDL.Text,
    'description' : IDL.Text,
    'activity' : IDL.Text,
  });
  const User = IDL.Principal;
  const DatosFecha = IDL.Record({
    'id' : IDL.Nat,
    'day' : IDL.Nat,
    'month' : IDL.Nat,
    'year' : IDL.Nat,
  });
  return IDL.Service({
    'deleteActivity' : IDL.Func([IDL.Principal, IDL.Text], [IDL.Bool], []),
    'getActivity' : IDL.Func([IDL.Principal, IDL.Text], [IDL.Opt(Info)], []),
    'getActivitys' : IDL.Func(
        [User],
        [IDL.Vec(IDL.Tuple(IDL.Text, Info))],
        ['query'],
      ),
    'getUser' : IDL.Func([], [IDL.Principal], []),
    'saveActivity' : IDL.Func([DatosFecha, Info], [Info], []),
    'updateActivity' : IDL.Func(
        [IDL.Principal, IDL.Text, Info],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
