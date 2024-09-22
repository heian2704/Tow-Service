import Vehicle from '../models/Vehicle';

export const getVehicleByUserId = async (userId) => {
  return Vehicle.findOne({ userId });
};
