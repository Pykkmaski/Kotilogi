## [1.5.2] - 14-01-2025

### Changed

- The padding for screen sizes on the index page.

## [1.5.1] - 10-01-2025

### Changed

- The cookie notice button colors to the primary color.

### Added

- Missing cookie settings-button.

## [1.5.0] - 10-01-2025

### Added

- The contact-link as part of the VPMobileMenu.

### Fixed

- ToggleProvider.Trigger not registering the onClick-event of its child.

### Changed

- Altered the VPMobileMenu to work within the IndexPageContext, and replaced the index header mobile menu button with it.

## [1.4.0] - 09-01-2025

### Fixed

- Brand-label in the lock editor being in english. Changed it to finnish.

### Added

- Type for the searchParams on the files-page.
- A key to both the logged in- and logged out links in the VPMobileMenu.

### Changed

- Created DerivedSelectorProps for the derived selectors of BaseSelector.
- Replaced the lock type selector with the new RadioSelector component.
- Replaced all OptionSelectors with RadioSelector in RoofEditor.
- Replaced all OptionSelectors with RadioSelector in DrainageDitchEditor.
- Replaced all OptionSelectors with RadioSelector in BuildingEditor.
- Replaced all OptionSelectors with RadioSelector in SewerPipeEditor.
- Replaced all OptionSelectors with RadioSelector in WaterPipeEditor.
- Replaced all OptionSelectors with RadioSelector in InsulationEditor.
- Made the WindowBatch fields non-required.
- Destructured the property id from the params on the [eventId]-page.

### Removed

- Tests from HighlightingNavBar.test that referred to the deleted component "FooterNav".
- Removed the React.use wrapping of the searchParams on the AddFiles-page.

## [1.3.0] - 08-01-2025

### Fixed

- Surfaces not getting de-selected when changing event types.
- Suppressed the NEXT_REDIRECT error-toast when creating events.

### Changed

- Added a heading above the area under dashboard/settings where the account is deleted, to make it clearer what it does.
- Removed the hard-coded text-color class from the title of TitleWithParagraphLayout, to make the color controlable from the outside.
- Wrapped the searchParams under /activated and /dashboard/files/add inside React.use, as recommended by Next.js/React.
- Made cosmetic renovation targets only show up when a target is selected.
- Awaiting the params on the add event-page.
- Moved selectedSurfaceIds and related functions into the useEventData-hook.
- Deprecated OptionSelector.
- Updated ElectricalEditor to use the new CheckboxSelector, so multiple targets can be selected at once.
- Updated SurfaceSelector to use the new CheckboxSelector.

### Added

- Conditional links in the index header, changing to the dashboard and logout links, if logged in.
- Body size limit in next.config, to allow uploading of files larger than 1mb.
- Cases for window- and other service event targets.
- Case for adding other-typed service events.
- Case for adding inserting structure-service events.
- Case for adding water pipe service events.
- Case for adding sewer pipe service events.
- Case for adding insulation service events.
- Case for adding electricity service events.
- 'Other' as a target for cosmetic renovation events.
- useToggleableEntries-hook, for creating arrays where each entry can be toggled on or off.
- A new BaseSelector, and the derived components: CheckboxSelector and RadioSelector, to replace the old OptionSelector.
- A key to each button inside a radio group.

### Removed

- Unused elecrtric event content.
- Removed the async from the logout-page definition, as it is not supported in client-components.

## [1.2.3] - 08-01-2025

### Fixed

- The z-index of the register/success page to make it visible.
- No redirection to the dashboard happening on the /activated page.

### Changed

- The success toast text on successful registration.
- The file extension of the app/api/public/users/register/route from .tsx to .ts.

- Changed the text color of the register success-page content to white.
- Changed the text color of the link to resending the account activation link to the primary-wf-color.
- Changed the text displayed on the /activated page.

## [1.2.2] - 08-01-2025

### Changed

- Updated the app favicon.

## [1.2.1] - 07-01-2025

### Changed

-Updated the padding on different screen sizes on the properties-page, add- and update property page, the add-event page, and the utility add-page.

## [1.2.0] - 07.01.2025

### Added

- Added handling for firealarm service events.

## [1.1.1] - 07.01.2025

### Fixed

- Added missing href's to the instagram-, and facebook links in the footer.
- Fixed the contact us-link on pages other than the index-page, when using mobile devices.
- Changed the app version to be read from the package.json version.
