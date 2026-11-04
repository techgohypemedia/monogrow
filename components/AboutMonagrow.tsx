"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./AboutMonagrow.module.css";

interface AboutMonagrowProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

// Physics-based paper deformation engine simulating realistic flexible paper turn
function getLeafPhysics(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  const arch = Math.sin(clamped * Math.PI);
  const angle = -clamped * 180;

  // 1. Realistic Z-Lift: Paper arches toward the reader in 3D perspective space
  const zLift = arch * 24;

  // 2. Foreshortening / Horizontal compression: Paper curves into a cylindrical arch
  const scaleX = 1 - arch * 0.035;

  // 3. Diagonal Twist (corner peeling effect leading the turn)
  const curlZ = -Math.sin(clamped * Math.PI * 2) * 1.4;
  const skewY = Math.sin(clamped * Math.PI * 2) * .9;

  // 4. Inward spine tension arc (pulling toward the binding)
  const xPull = -arch * 10;

  // 5. Dynamic Corner Rounding (edge curls softly mid-air)
  const dynamicRadius = `0 ${6 + arch * 2}px ${6 + arch * 2}px 0`;

  // 6. Cylindrical Moving Sheen & Shadow (the light reflecting along the curved cylinder)
  const frontSheenPos = Math.round(15 + clamped * 105);
  const backSheenPos = Math.round(15 + (1 - clamped) * 105);

  const frontSheenGradient = arch > 0.01
    ? `linear-gradient(${105 + clamped * 20}deg, transparent 0%, rgba(255,255,255,${(arch * 0.45).toFixed(2)}) ${frontSheenPos}%, rgba(35,22,15,${(arch * 0.25).toFixed(2)}) ${frontSheenPos + 18}%, transparent ${frontSheenPos + 34}%)`
    : "none";

  const backSheenGradient = arch > 0.01
    ? `linear-gradient(${75 - (1 - clamped) * 20}deg, transparent 0%, rgba(255,255,255,${(arch * 0.45).toFixed(2)}) ${backSheenPos}%, rgba(35,22,15,${(arch * 0.25).toFixed(2)}) ${backSheenPos + 18}%, transparent ${backSheenPos + 34}%)`
    : "none";

  // 7. Dynamic 3D Box Shadow of the turning leaf in space
  const shadowX = Math.cos(clamped * Math.PI) * (10 + arch * 16);
  const shadowY = 6 + arch * 20;
  const shadowBlur = Math.round(16 + arch * 48);
  const shadowAlpha = (0.06 + arch * 0.28).toFixed(2);
  const leafBoxShadow = arch > 0.01
    ? `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px ${shadowBlur}px rgba(25, 15, 10, ${shadowAlpha})`
    : undefined;

  // 8. Dynamic cast shadow on the pages beneath
  const shadowUnderRight = clamped < 0.6
    ? Math.sin(Math.min(1, clamped * 2) * Math.PI) * 0.44 * (1 - clamped)
    : 0;

  const shadowUnderLeft = clamped > 0.4
    ? Math.sin(Math.max(0, (clamped - 0.5) * 2) * Math.PI) * 0.48
    : 0;

  return {
    transform: `translate3d(${xPull.toFixed(2)}px, 0, ${zLift.toFixed(2)}px) rotateY(${angle.toFixed(2)}deg) rotateZ(${curlZ.toFixed(2)}deg) skewY(${skewY.toFixed(2)}deg) scaleX(${scaleX.toFixed(3)})`,
    dynamicRadius,
    frontSheenGradient,
    backSheenGradient,
    frontSheenOpacity: arch,
    backSheenOpacity: arch,
    leafBoxShadow,
    shadowUnderRight,
    shadowUnderLeft,
  };
}

export default function AboutMonagrow({ onOpenQuoteModal }: AboutMonagrowProps = {}) {
  const trackRef = useRef<HTMLElement>(null);
  const [turn1Progress, setTurn1Progress] = useState(0); // 0 (Spread 1) to 1 (Spread 2)
  const [turn2Progress, setTurn2Progress] = useState(0); // 0 (Spread 2) to 1 (Spread 3)
  const [isMobile, setIsMobile] = useState(false);

  const target1Ref = useRef(0);
  const target2Ref = useRef(0);
  const current1Ref = useRef(0);
  const current2Ref = useRef(0);
  const animFrameId = useRef<number | null>(null);

  // Detect mobile viewport
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || reduced.matches);
    };
    reduced.addEventListener("change", checkMobile);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => { window.removeEventListener("resize", checkMobile); reduced.removeEventListener("change", checkMobile); };
  }, []);

  // Smooth inertial scroll loop with dampening for silky-smooth page turning
  useEffect(() => {
    if (isMobile) return;

    const computeTarget = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.min(1, Math.max(0, currentScroll / scrollableDistance));

      // Phase 1: Turn Leaf 1 from 0.06 to 0.46
      let p1 = 0;
      if (rawProgress <= 0.06) {
        p1 = 0;
      } else if (rawProgress >= 0.46) {
        p1 = 1;
      } else {
        p1 = (rawProgress - 0.06) / 0.40;
      }
      target1Ref.current = 0.5 - 0.5 * Math.cos(p1 * Math.PI);

      // Phase 2: Turn Leaf 2 from 0.54 to 0.94
      let p2 = 0;
      if (rawProgress <= 0.54) {
        p2 = 0;
      } else if (rawProgress >= 0.94) {
        p2 = 1;
      } else {
        p2 = (rawProgress - 0.54) / 0.40;
      }
      target2Ref.current = 0.5 - 0.5 * Math.cos(p2 * Math.PI);
    };

    let isRunning = false;
    let lastTime = 0;
    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(50, time - lastTime) : 16.67;
      lastTime = time;
      const damping = 1 - Math.exp(-elapsed / 100);
      const diff1 = target1Ref.current - current1Ref.current;
      const diff2 = target2Ref.current - current2Ref.current;

      // Silky damping factor: responsive feel with lifelike momentum
      if (Math.abs(diff1) > 0.0003) {
        current1Ref.current += diff1 * damping;
      } else {
        current1Ref.current = target1Ref.current;
      }

      if (Math.abs(diff2) > 0.0003) {
        current2Ref.current += diff2 * damping;
      } else {
        current2Ref.current = target2Ref.current;
      }

      setTurn1Progress(current1Ref.current);
      setTurn2Progress(current2Ref.current);

      const stillMoving =
        Math.abs(target1Ref.current - current1Ref.current) > 0.0003 ||
        Math.abs(target2Ref.current - current2Ref.current) > 0.0003;

      if (stillMoving) {
        animFrameId.current = requestAnimationFrame(tick);
      } else {
        isRunning = false;
        lastTime = 0;
      }
    };

    const onScroll = () => {
      computeTarget();
      if (!isRunning) {
        isRunning = true;
        animFrameId.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    computeTarget();
    current1Ref.current = target1Ref.current;
    current2Ref.current = target2Ref.current;
    setTurn1Progress(target1Ref.current);
    setTurn2Progress(target2Ref.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isMobile]);

  // Compute 3D physics for both turning leaves
  const leaf1Physics = getLeafPhysics(turn1Progress);
  const leaf2Physics = getLeafPhysics(turn2Progress);

  // Dynamic z-index layering
  let leaf1ZIndex = 35;
  if (turn1Progress >= 1) {
    leaf1ZIndex = 25;
  }

  let leaf2ZIndex = 20;
  if (turn2Progress > 0) {
    leaf2ZIndex = 45;
  } else if (turn1Progress >= 1) {
    leaf2ZIndex = 25;
  }

  return (
    <section
      id="about-us"
      ref={trackRef}
      className={styles.bookTrack}
      aria-label="About Monagrow Story & Commodities"
    >
      <div className={styles.stickyStage}>
        {/* Subtle ambient watermark */}
        <div className={styles.ambientWatermark} aria-hidden="true">
          <Image
            src="/assets/monagrow-official-symbol.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Eyebrow Header (dots removed) */}
        <div className={styles.stageHeader}>
          <div className={styles.eyebrowWrapper}>
            <p className={styles.eyebrow}>
              About Monagrow
            </p>
          </div>
        </div>

        {/* =========================================================
            DESKTOP 3D EDITORIAL SPREAD (3 SPREADS / 2 LEAVES)
            ========================================================= */}
        {!isMobile && (
          <div className={styles.bookContainer}>
            <div className={styles.book}>
              {/* Minimal Center Seam */}
              <div className={styles.spineSeam} aria-hidden="true" />

              {/* ----------------------------------------------------
                  PAGE 01: Left Base Panel (Spread 1 Left -> IMAGE 1)
                  ---------------------------------------------------- */}
              <div className={`${styles.page} ${styles.leftBasePage} ${styles.imagePanel}`}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/assets/about-harvest-origin.jpg"
                    alt="Agricultural origin harvest estate, agronomist inspecting golden harvest with grower"
                    fill
                    priority
                    sizes="(max-width: 1260px) 50vw, 630px"
                    className={styles.panelImage}
                  />
                </div>
                {/* Dynamic Contact Shadow when Leaf 1 lands onto Page 01 */}
                <div
                  className={`${styles.pageShadowOverlay} ${styles.castShadowLeft}`}
                  style={{ opacity: leaf1Physics.shadowUnderLeft }}
                  aria-hidden="true"
                />
              </div>

              {/* ----------------------------------------------------
                  PAGE 06: Right Base Panel (Spread 3 Right -> CONTENT 3)
                  ---------------------------------------------------- */}
              <div className={`${styles.page} ${styles.rightBasePage}`}>
                <div className={styles.pageContentCentered}>
                  <div className={styles.centeredHeaderBlock}>
                    <h2 className={styles.mainTitleCentered}>
                      Rigorous quality
                      <em>Seamless global export</em>
                    </h2>
                  </div>

                  <div className={styles.narrativeBlock}>
                    <p className={styles.narrativeParagraph}>
                      Every consignment undergoes comprehensive quality evaluation—from grain moisture testing and purity sortex to ISO-certified laboratory checks and origin phytosanitary documentation.
                    </p>
                    <p className={styles.narrativeParagraph}>
                      Whether procuring trial batches or regular container volumes, our trade desk coordinates documentation, custom packaging, and multi-port ocean freight on FOB, CIF or CFR terms.
                    </p>
                  </div>

                  <div className={styles.moreAboutRow}>
                    <Link href="/about-us" className={styles.moreAboutLink}>
                      <span>More about Monagrow</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Dynamic Cast Shadow when Leaf 2 lifts off */}
                <div
                  className={`${styles.pageShadowOverlay} ${styles.castShadowRight}`}
                  style={{ opacity: leaf2Physics.shadowUnderRight }}
                  aria-hidden="true"
                />
              </div>

              {/* ----------------------------------------------------
                  LEAF 2: (Spread 2 Right Image 2 -> Spread 3 Left Image 3)
                  ---------------------------------------------------- */}
              <div
                className={styles.turningLeaf}
                style={{
                  transform: leaf2Physics.transform,
                  zIndex: leaf2ZIndex,
                }}
              >
                {/* FRONT FACE: Page 04 (Spread 2 Right -> IMAGE 2: QUALITY LAB) */}
                <div
                  className={`${styles.frontFace} ${styles.imagePanel}`}
                  style={{
                    boxShadow: turn2Progress < 0.5 ? leaf2Physics.leafBoxShadow : undefined,
                    borderRadius: leaf2Physics.dynamicRadius,
                  }}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src="/assets/monagrow-product-testing-lab.jpg"
                      alt="Food science laboratory quality testing and grain purity inspection"
                      fill
                      sizes="(max-width: 1260px) 50vw, 630px"
                      className={styles.panelImage}
                    />
                  </div>

                  {/* Dynamic cast shadow from Leaf 1 as it lifts off Leaf 2 */}
                  <div
                    className={`${styles.pageShadowOverlay} ${styles.castShadowRight}`}
                    style={{ opacity: leaf1Physics.shadowUnderRight }}
                    aria-hidden="true"
                  />

                  {/* Flexible paper cylindrical curvature sheen */}
                  <div
                    className={styles.leafSheen}
                    style={{
                      background: leaf2Physics.frontSheenGradient,
                      opacity: leaf2Physics.frontSheenOpacity,
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* BACK FACE: Page 05 (Spread 3 Left -> IMAGE 3: SHIPPING VESSEL) */}
                <div
                  className={`${styles.backFace} ${styles.imagePanel}`}
                  style={{
                    boxShadow: turn2Progress >= 0.5 ? leaf2Physics.leafBoxShadow : undefined,
                    borderRadius: leaf2Physics.dynamicRadius,
                  }}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src="/assets/about-shipping-vessel.jpg"
                      alt="International ocean freight container ship at deepwater port terminal"
                      fill
                      sizes="(max-width: 1260px) 50vw, 630px"
                      className={styles.panelImage}
                    />
                  </div>
                  {/* Flexible paper cylindrical curvature sheen */}
                  <div
                    className={styles.leafSheen}
                    style={{
                      background: leaf2Physics.backSheenGradient,
                      opacity: leaf2Physics.backSheenOpacity,
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* ----------------------------------------------------
                  LEAF 1: (Spread 1 Right Content 1 -> Spread 2 Left Content 2)
                  ---------------------------------------------------- */}
              <div
                className={styles.turningLeaf}
                style={{
                  transform: leaf1Physics.transform,
                  zIndex: leaf1ZIndex,
                }}
              >
                {/* FRONT FACE: Page 02 (Spread 1 Right -> CONTENT 1) */}
                <div
                  className={styles.frontFace}
                  style={{
                    boxShadow: turn1Progress < 0.5 ? leaf1Physics.leafBoxShadow : undefined,
                    borderRadius: leaf1Physics.dynamicRadius,
                  }}
                >
                  <div className={`${styles.pageContentCentered} ${styles.introPartnershipSection}`}>
                    <div className={styles.centeredHeaderBlock}>
                      <h2 className={styles.mainTitleCentered} id="about-monagrow-title">
                        Good ingredients
                        <em>Lasting partnerships</em>
                      </h2>
                      <p className={styles.aboutSummaryCentered}>
                        From the first sourcing conversation to the next shipment, we make the details of wholesale trade easier to navigate.
                      </p>
                    </div>

                    <div className={styles.narrativeBlock}>
                      <p className={styles.narrativeParagraph}>
                        Monagrow is an agricultural commodity wholesaler and exporter connecting origin mills and growers with businesses around the world.
                      </p>
                      <p className={styles.narrativeParagraph}>
                        We specialize in direct origin procurement across Basmati rice, estate coffee, sugar and royal dry fruits—ensuring consistency, transparent specifications, and dedicated trade support.
                      </p>
                    </div>
                  </div>

                  {/* Flexible paper cylindrical curvature sheen */}
                  <div
                    className={styles.leafSheen}
                    style={{
                      background: leaf1Physics.frontSheenGradient,
                      opacity: leaf1Physics.frontSheenOpacity,
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* BACK FACE: Page 03 (Spread 2 Left -> CONTENT 2: 3 PILLARS) */}
                <div
                  className={styles.backFace}
                  style={{
                    boxShadow: turn1Progress >= 0.5 ? leaf1Physics.leafBoxShadow : undefined,
                    borderRadius: leaf1Physics.dynamicRadius,
                  }}
                >
                  <div className={styles.pageContent}>
                    <div className={styles.pillarListClean}>
                      {/* Pillar 01 */}
                      <div className={styles.pillarItemClean}>
                        <h3>A closer connection to the source</h3>
                        <p>
                          Our sourcing conversations begin with origin mills and growers. We bring product specifications and origin information into the buying process so you can compare the grain, roast, grade or refinement that suits your market.
                        </p>
                      </div>

                      {/* Pillar 02 */}
                      <div className={styles.pillarItemClean}>
                        <h3>The right format for your business</h3>
                        <p>
                          Retail packs and bulk supply serve different needs. Tell us your required volume, preferred packaging and intended use, and we can discuss suitable options for your wholesale order.
                        </p>
                      </div>

                      {/* Pillar 03 */}
                      <div className={styles.pillarItemClean}>
                        <h3>Clarity beyond the quotation</h3>
                        <p>
                          A useful quote starts with the destination, delivery terms and product requirements. We help coordinate documentation and shipment details, giving your team a clearer basis for planning.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic cast shadow from Leaf 2 when turning over Leaf 1 Back */}
                  <div
                    className={`${styles.pageShadowOverlay} ${styles.castShadowLeft}`}
                    style={{ opacity: leaf2Physics.shadowUnderLeft }}
                    aria-hidden="true"
                  />

                  {/* Flexible paper cylindrical curvature sheen */}
                  <div
                    className={styles.leafSheen}
                    style={{
                      background: leaf1Physics.backSheenGradient,
                      opacity: leaf1Physics.backSheenOpacity,
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            MOBILE RESPONSIVE SPREAD VIEW (3 CHAPTERS)
            ========================================================= */}
        {isMobile && (
          <div className={styles.bookContainer}>
            <div className={styles.book}>
              {/* Chapter 1: Farm Origin Image + Good Ingredients Centered Content */}
              <div className={`${styles.leftBasePage} ${styles.mobileImageCard}`}>
                <div className={styles.mobileImageWrapper}>
                  <Image
                    src="/assets/about-harvest-origin.jpg"
                    alt="Agricultural origin harvest estate, agronomist inspecting golden harvest with grower"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={styles.frontFace}>
                <div className={`${styles.pageContentCentered} ${styles.introPartnershipSection}`}>
                  <div className={styles.centeredHeaderBlock}>
                    <h2 className={styles.mainTitleCentered}>
                      Good ingredients
                      <em>Lasting partnerships</em>
                    </h2>
                    <p className={styles.aboutSummaryCentered}>
                      From the first sourcing conversation to the next shipment, we make the details of wholesale trade easier to navigate.
                    </p>
                  </div>

                  <div className={styles.narrativeBlock}>
                    <p className={styles.narrativeParagraph}>
                      Monagrow is an agricultural commodity wholesaler and exporter connecting origin mills and growers with businesses around the world.
                    </p>
                    <p className={styles.narrativeParagraph}>
                      We specialize in direct origin procurement across Basmati rice, estate coffee, sugar and royal dry fruits—ensuring consistency, transparent specifications, and dedicated trade support.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chapter 2: The 3 Pillars (Clean, no icons, no background) + Shipping Vessel Image */}
              <div className={styles.backFace}>
                <div className={styles.pageContent}>
                  <div className={styles.pillarListClean}>
                    <div className={styles.pillarItemClean}>
                      <h3>A closer connection to the source</h3>
                      <p>
                        Our sourcing conversations begin with origin mills and growers. We bring product specifications and origin information into the buying process so you can compare the grain, roast, grade or refinement that suits your market.
                      </p>
                    </div>

                    <div className={styles.pillarItemClean}>
                      <h3>The right format for your business</h3>
                      <p>
                        Retail packs and bulk supply serve different needs. Tell us your required volume, preferred packaging and intended use, and we can discuss suitable options for your wholesale order.
                      </p>
                    </div>

                    <div className={styles.pillarItemClean}>
                      <h3>Clarity beyond the quotation</h3>
                      <p>
                        A useful quote starts with destination, delivery terms and product requirements. We help coordinate documentation and shipment details, giving your team a clearer basis for planning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.rightBasePage} ${styles.mobileImageCard}`}>
                <div className={styles.mobileImageWrapper}>
                  <Image
                    src="/assets/monagrow-product-testing-lab.jpg"
                    alt="Food science laboratory quality testing and grain purity inspection"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Chapter 3: Shipping Vessel Image + Global Export & More about Monagrow */}
              <div className={`${styles.leftBasePage} ${styles.mobileImageCard}`}>
                <div className={styles.mobileImageWrapper}>
                  <Image
                    src="/assets/about-shipping-vessel.jpg"
                    alt="International ocean freight container ship at deepwater port terminal"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={styles.rightBasePage}>
                <div className={styles.pageContentCentered}>
                  <div className={styles.centeredHeaderBlock}>
                    <h2 className={styles.mainTitleCentered}>
                      Rigorous quality
                      <em>Seamless global export</em>
                    </h2>
                  </div>

                  <div className={styles.narrativeBlock}>
                    <p className={styles.narrativeParagraph}>
                      Every consignment undergoes comprehensive quality evaluation—from grain moisture testing and purity sortex to ISO-certified laboratory checks and origin phytosanitary documentation.
                    </p>
                    <p className={styles.narrativeParagraph}>
                      Whether procuring trial batches or regular container volumes, our trade desk coordinates documentation, custom packaging, and multi-port ocean freight on FOB, CIF or CFR terms.
                    </p>
                  </div>

                  <div className={styles.moreAboutRow}>
                    <Link href="/about-us" className={styles.moreAboutLink}>
                      <span>More about Monagrow</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
