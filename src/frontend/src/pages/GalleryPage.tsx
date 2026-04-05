import { Image, X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useGallery } from "../hooks/useQueries";

const sampleGallery = [
  {
    caption: "CTF Championship 2025 - Our team won first place!",
    imageUrl: "/assets/generated/gallery-workshop.dim_600x400.jpg",
  },
  {
    caption: "Web Security Workshop - 60+ participants",
    imageUrl: "/assets/generated/event-ctf-workshop.dim_800x450.jpg",
  },
  {
    caption: "Annual Hackathon - 24 hours of hacking",
    imageUrl: "/assets/generated/hero-cyber-bg.dim_1600x600.jpg",
  },
  {
    caption: "Network Forensics Lab Session",
    imageUrl: "/assets/generated/gallery-workshop.dim_600x400.jpg",
  },
  {
    caption: "Guest Lecture: Industry CISO Visit",
    imageUrl: "/assets/generated/blog-security-cover.dim_800x450.jpg",
  },
  {
    caption: "Bug Bounty Workshop 2025",
    imageUrl: "/assets/generated/event-ctf-workshop.dim_800x450.jpg",
  },
];

type GalleryItemType = { caption: string; imageUrl?: string; blobId?: string };

function GalleryItemComponent({
  item,
  index,
  onClick,
}: { item: GalleryItemType; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="relative group overflow-hidden rounded-xl cursor-pointer aspect-video glass-card-green"
      onClick={onClick}
      data-ocid={`gallery.item.${index + 1}`}
    >
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-cyber-elevated">
          <Image className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-sm font-medium line-clamp-2">
            {item.caption}
          </p>
        </div>
        <div className="absolute top-4 right-4">
          <ZoomIn className="w-5 h-5 text-neon-green" />
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const { data: galleryFromBackend = [], isLoading } = useGallery();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items =
    galleryFromBackend.length > 0 ? galleryFromBackend : sampleGallery;
  const current = lightboxIndex !== null ? items[lightboxIndex] : null;

  const prev = () =>
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : items.length - 1));
  const next = () =>
    setLightboxIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : 0));

  return (
    <div className="pt-20">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-30" />
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-neon-green/10 border border-neon-green/30 text-neon-green mb-6">
              <Image className="w-3.5 h-3.5" /> Gallery
            </span>
            <h1 className="section-title text-4xl md:text-5xl mb-4">
              Our <span className="neon-text-green">Moments</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Capturing memories from workshops, competitions, and club
              activities.
            </p>
          </motion.div>

          {isLoading ? (
            <LoadingSpinner text="Loading gallery..." />
          ) : items.length === 0 ? (
            <div
              className="glass-card-green p-16 text-center"
              data-ocid="gallery.empty_state"
            >
              <Image className="w-12 h-12 text-neon-green/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No gallery items yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <GalleryItemComponent
                  key={item.caption}
                  item={item}
                  index={i}
                  onClick={() => setLightboxIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {current && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,10,15,0.95)" }}
            onClick={() => setLightboxIndex(null)}
            data-ocid="gallery.modal"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="gallery.close_button"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="rounded-xl overflow-hidden border border-neon-green/20 shadow-neon-green">
                {current.imageUrl && (
                  <img
                    src={current.imageUrl}
                    alt={current.caption}
                    className="w-full max-h-[70vh] object-contain bg-black"
                  />
                )}
              </div>

              <p className="text-center text-muted-foreground text-sm mt-4">
                {current.caption}
              </p>

              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  onClick={prev}
                  className="neon-btn-green px-4 py-2 rounded-lg text-sm"
                  data-ocid="gallery.button"
                >
                  &larr; Prev
                </button>
                <span className="text-muted-foreground text-sm font-mono">
                  {lightboxIndex + 1} / {items.length}
                </span>
                <button
                  type="button"
                  onClick={next}
                  className="neon-btn-green px-4 py-2 rounded-lg text-sm"
                  data-ocid="gallery.button"
                >
                  Next &rarr;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
