## [2.3.2] - 05-02-2025

### Changed

- The unit-input to optional when adding utility bills.

### Fixed

- Utility-data dates not being properly saved.

## [2.3.1] - 31-01-2025

### Fixed

- The grid on the blog posts page.
- Text overflowing on on the blog post-page, on mobile devices.

## [2.3.0] - 31-01-2025

### Added

- Blog pages.
- Next config images domain.

## [2.2.1] - 30-01-2025

### Unreleased

- See log for 2.1.0

### Fixed

- Incorrect links in the index-menu when on a mobile device.

## [2.2.0] - 24-01-2025

### Unreleased

- See log for 2.1.0

### Added

- Exterior cladding-event target.
- wf-container tailwind utility-class.

### Changed

- Moved the business-section on the index-page.
- The call to action-section to include text about inquires about a business account.
- The name of the blog-section from "Jutut" to "Blogi".

### Removed

- The business-link from the header.
- The business-route.
- Some unused imports.

## [2.1.0] - 23.01.2025

### Unreleased

- Changed the blog entries on the blog page to be fetched from the db, instead of being hard-coded.

### Added

- blog_posts database-table.

### Removed

- The work type selector when creating an event with target "Other".

### Changed

- Increased the padding on the DataPointContainer.
- Made the DataPointContainer background lighter.

## Fixed

- Images not appearing in the event image selector dialog.
- The images on a SelectImageDialog being off-center on the grid.
- Main images on the property- and event-pages looking squished.

## [2.0.1] - 22.01.2025

### Added

- A short description of the web-service in the readme.

### Changed

- Heading levels of the 2.0.0 update in this changelog.

### Removed

- The next.js-related stuff from the readme.

## [2.0.0] - 22.01.2025

### Added

- Display of restoration- or service-data when viewing an event.
- The classes Insulation, Locks, Electricity, Heating, SewerPipes and WaterPipes.
- Methods to get the service-data for service events.
- Ability to open and close a BoxFieldset if the closeable-prop is set.

### Changed

- Moved methods fetching restoration- and service-data under their own classes.
- events.get now includes the data associated with each event.
- Moved BoxFieldset into its own file.

### Removed

- Unused (transparentHeader)-folder.
- Unused EventCardGrid-component.
- The NewAddPropertyModal-folder.
- DeletePropertyDialogControl
- /dashboard/\_components-folder.
- Various unused imports.
- Documentation on file-server actions.
- The edit event-page.
- The deprecated events.getExtraData-method.
- The deprecated events.createHeatingRestorationWorkData-method.
- The unused events.createGenesisEvent-method.

## [1.8.0] - 20.01.2025

### Removed

- The unused DashboardProvider-component.

### Added

- Pagination to the events page.
- A key to each ImageSelector of the SelectImageDialog.
- A key to each element in the utility type selector.

### Changed

- The way events.get retrieves events. The events displayed on the page are now either 10, or whatever is left to display on the last page.
- Downgraded ag-grid to make it work again.

## [1.7.0] - 20-01-2025

### Fixed

- New passwords in the PasswordSettingsForm being auto-filled, when they should not be.

### Removed

- Console log statements on the activated-page.
- Error toast on the DeleteUserForm, if it contains the string "NEXT_REDIRECT".

### Changed

- Moved the status-variable into its separate state in the PasswordSettingsForm.
- Disabled the submit the PasswordSettingsForm when the password has been successfully changed.

### Added

- The statuses "success" and "error" on the PasswordSettingsForm.
- Feedback that the password change succeeded on the PasswordSettingsForm.
- Feedback for unexpected errors on the PasswordSettingsForm.

## [1.6.2] - 19.01.2025

### Fixed

- The redirection on the activated page not working, if not logged in.

### Added

- The action-variable as a dependency to the useEffect on the activated-page.

## [1.6.1] - 19.01.2025

### Fixed

- Typo on the business page (The word kiinnostunut was missing an n).

## [1.6.0] - 19-01-2025

### Changed

- Added contact link to the business-page.
- Added the front page story as a story in the blog page.

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
