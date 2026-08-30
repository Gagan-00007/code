export default function Organizers() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-12">
          <p className="text-sm text-accent-blue font-bold uppercase tracking-widest mb-4">
            Hosted By
          </p>
          <h2 className="font-display text-4xl uppercase text-off-white mb-2">
            SynaptIQ AI&ML Club
          </h2>
          <p className="text-accent-gold font-medium tracking-widest uppercase text-sm">
            Automate &middot; Innovate &middot; Lead
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-white/10 pt-12">
          <div>
            <h3 className="font-bold text-off-white mb-1">Dr. Santosh M Muranal</h3>
            <p className="text-sm text-foreground/60 uppercase tracking-wider">Principal, AIEMS</p>
          </div>
          <div>
            <h3 className="font-bold text-off-white mb-1">Dr. Rajeshwar Kadadevaramath</h3>
            <p className="text-sm text-foreground/60 uppercase tracking-wider">Dean, Academics</p>
          </div>
          <div>
            <h3 className="font-bold text-off-white mb-1">Prof. Shreyas Shivananjappa</h3>
            <p className="text-sm text-foreground/60 uppercase tracking-wider">HOD, AI & ML Dept.</p>
          </div>
          <div>
            <h3 className="font-bold text-off-white mb-1">Prof. Sangeetha N</h3>
            <p className="text-sm text-foreground/60 uppercase tracking-wider">Faculty Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
