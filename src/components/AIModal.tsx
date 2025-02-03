import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function AIModal({
  isOpen,
  onClose,
  comments,
}: {
  isOpen: boolean;
  onClose: () => void;
  comments: string[];
}) {
  const categorizeComments = (comments: string[]) => {
    return {
      analysis: comments.find(c => c.startsWith('AI Analysis:')),
      recommendations: comments.filter(c => c.startsWith('Recommendation:')),
      risks: comments.filter(c => c.startsWith('Risk Assessment:')),
    };
  };

  const { analysis, recommendations, risks } = categorizeComments(comments);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl rounded-lg bg-white p-6">
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-lg font-bold">AI Analiz</Dialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            {analysis && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-600 mb-2">Analiz</h3>
                <p className="text-gray-600">{analysis.replace('AI Analysis: ', '')}</p>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-600 mb-2">Öneriler</h3>
                <ul className="list-disc pl-5">
                  {recommendations.map((rec, i) => (
                    <li key={i} className="text-gray-600">
                      {rec.replace('Recommendation: ', '')}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {risks.length > 0 && (
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-medium text-red-600 mb-2">Risk Değerlendirmesi</h3>
                <ul className="list-disc pl-5">
                  {risks.map((risk, i) => (
                    <li key={i} className="text-gray-600">
                      {risk.replace('Risk Assessment: ', '')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}