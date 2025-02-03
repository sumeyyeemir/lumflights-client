'use client';

import { useState, useEffect } from 'react';
import { apiService, Reservation } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import ReservationCard from '@/components/ReservationCard';
import AIModal from '@/components/AIModal';
import DateRangePicker from '@/components/DateRangePicker';
import Pagination from '@/components/Pagination';

export default function DashboardPage() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<[Date, Date]>();

  useEffect(() => {
    const interval = setInterval(fetchReservations, 10000);
    fetchReservations();
    return () => clearInterval(interval);
  }, [currentPage, dateRange]);

  const fetchReservations = async () => {
    const { data } = await apiService.reservations.getAll({
      page: currentPage,
      limit: 5,
      startDate: dateRange?.[0].toISOString(),
      endDate: dateRange?.[1].toISOString(),
    });
    setReservations(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {user?.role === 'admin' && (
        <div className="mb-6">
          <DateRangePicker onChange={setDateRange} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map(reservation => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            role={user?.role}
            onShowAI={() => setSelectedReservation(reservation)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(10)}
        onPageChange={setCurrentPage}
      />

      <AIModal
        isOpen={!!selectedReservation}
        onClose={() => setSelectedReservation(null)}
        comments={selectedReservation?.comments || []}
      />
    </div>
  );
}