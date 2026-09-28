import { DetailSection } from './DetailSection';

const details = [
  { label: 'University', value: 'Eastern Mediterranean University' },
  { label: 'Department', value: 'Electrical & Electronics Engineering' },
  { label: 'Supervisor', value: 'Prof. Dr. Erhan İnce' },
  { label: 'Team', value: 'Amro Mohamedain, Canberk Balkir, Philip Olembo' },
  { label: 'Jury Date', value: '31 January 2022' },
  { label: 'Result', value: '2nd Place' },
  { label: 'Total Build Cost', value: '~$200' },
  { label: 'Build Duration', value: 'October 2021 – January 2022' },
];

export function ProjectDetails() {
  return (
    <DetailSection bg="bg">
      <h2 className="font-display font-extrabold text-white text-[32px] mb-10">Project Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {details.map((detail) => (
          <div key={detail.label} className="py-4 border-b border-accent/20">
            <p className="font-body text-[11px] text-accent uppercase tracking-wide mb-1.5 font-semibold">
              {detail.label}
            </p>
            <p className="font-display text-base text-white font-bold">{detail.value}</p>
          </div>
        ))}
      </div>
    </DetailSection>
  );
}
