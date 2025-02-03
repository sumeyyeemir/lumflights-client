import { Reservation } from '@/services/api';

export default function ReservationCard({
  reservation,
  role,
  onShowAI,
}: {
  reservation: Reservation;
  role?: 'admin' | 'staff';
  onShowAI: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{reservation.flightNumber}</h3>
          <p className="text-sm text-gray-500">
            {reservation.departure} → {reservation.arrival}
          </p>
        </div>
        <button
          onClick={onShowAI}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          AI Analiz
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Tarih:</span>{' '}
          {new Date(reservation.date).toLocaleDateString()}
        </p>
        
        {role === 'admin' && (
          <div className="mt-2 border-t pt-2">
            <h4 className="text-sm font-medium mb-1">Yolcular:</h4>
            <ul className="space-y-1">
              {reservation.passengers.map((passenger, index) => (
                <li key={index} className="text-sm">
                  {passenger.name} ({passenger.age}) - {passenger.seatNumber}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}