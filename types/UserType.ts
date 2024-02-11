/**The status of the user.
 * active - The user has paid their annual bill and is verified as being active.
 * inactive - The user is inactivated due to not fulfilling their latest bill in time.
 * pending - The user is in their trial period.
 */

type UserStatusType = 'active' | 'inactive' | 'pending';
type UserPlanType = 'regular' | 'pro';

export type UserType = {
    email: string,
    status: UserStatusType,
    plan: UserPlanType,
}