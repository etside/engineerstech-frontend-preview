import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, MessageCircle, Mail } from "lucide-react";
import { api } from "@/lib/api";

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  bio: string;
  photo_url: string | null;
  linkedin_url: string | null;
  whatsapp_number: string | null;
}

const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .team()
      .then((data: any) => setMembers(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="container text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-4">
            Our Team
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Meet the People <span className="gradient-text">Behind the Code</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A lean team of skilled engineers driven by passion and precision.
          </p>
        </motion.div>
      </section>

      {/* Team Grid */}
      <section className="container">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Team information coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 border border-border/30 hover:border-primary/20 transition-all duration-300 text-center group"
              >
                {/* Photo */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                  {member.photo_url ? (
                    <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                      {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-primary/70 font-medium mb-3">{member.designation}</p>
                {member.bio && <p className="text-xs text-muted-foreground/70 leading-relaxed mb-4">{member.bio}</p>}

                {/* Social */}
                <div className="flex justify-center gap-3">
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.whatsapp_number && (
                    <a href={`https://wa.me/${member.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
                      <MessageCircle size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Team;
