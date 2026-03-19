import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Random "mo:core/Random";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import InviteLinksModule "invite-links/invite-links-module";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Community Requests
  type RequestStatus = {
    #pending;
    #seen;
    #done;
  };

  type CommunityRequest = {
    id : Nat;
    requesterName : Text;
    message : Text;
    timestamp : Int;
    status : RequestStatus;
  };

  var nextRequestId = 1;
  let requests = Map.empty<Nat, CommunityRequest>();

  public shared ({ caller }) func submitRequest(name : Text, message : Text) : async () {
    let request : CommunityRequest = {
      id = nextRequestId;
      requesterName = name;
      message;
      timestamp = Time.now();
      status = #pending;
    };
    requests.add(nextRequestId, request);
    nextRequestId += 1;
  };

  public shared ({ caller }) func updateRequestStatus(id : Nat, status : RequestStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update request status");
    };
    switch (requests.get(id)) {
      case (?req) {
        requests.add(
          id,
          { req with status },
        );
      };
      case (null) {
        Runtime.trap("Request not found");
      };
    };
  };

  public query ({ caller }) func getAllRequests() : async [CommunityRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view requests");
    };
    let iter = requests.values();
    iter.toArray();
  };

  // MC Plan Management
  type MCPlan = {
    id : Text;
    name : Text;
    description : Text;
    price : Text;
    features : [Text];
    isActive : Bool;
  };

  let mcPlans = Map.empty<Text, MCPlan>();

  public shared ({ caller }) func createOrUpdatePlan(
    id : Text,
    name : Text,
    description : Text,
    price : Text,
    features : [Text],
    isActive : Bool,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create/update plans");
    };
    let plan : MCPlan = { id; name; description; price; features; isActive };
    mcPlans.add(id, plan);
  };

  public shared ({ caller }) func deletePlan(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete plans");
    };
    mcPlans.remove(id);
  };

  public query ({ caller }) func getActivePlans() : async [MCPlan] {
    let filteredIter = mcPlans.values().filter(
      func(plan) {
        plan.isActive;
      }
    );
    filteredIter.toArray();
  };

  public shared ({ caller }) func initDefaultPlans() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can initialize plans");
    };

    let defaultPlans : [MCPlan] = [
      {
        id = "free";
        name = "Free";
        description = "Free Minecraft server hosting";
        price = "0$/mo";
        features = ["Basic server", "Limited slots", "No custom plugins"];
        isActive = true;
      },
      {
        id = "basic";
        name = "Basic";
        description = "Basic Minecraft server hosting";
        price = "3$/mo";
        features = ["More slots", "Custom plugins", "Better performance"];
        isActive = true;
      },
      {
        id = "pro";
        name = "Pro";
        description = "Pro Minecraft server hosting";
        price = "7$/mo";
        features = ["Unlimited slots", "Premium support", "Advanced features"];
        isActive = true;
      },
    ];

    for (plan in defaultPlans.values()) {
      mcPlans.add(plan.id, plan);
    };
  };

  // Page Visits Counter
  var pageVisits = 0;

  public shared ({ caller }) func incrementVisits() : async () {
    if (pageVisits == 1_000_000_000) {
      Runtime.trap("Too many page visits!");
    };
    pageVisits += 1;
  };

  public query ({ caller }) func getPageVisits() : async Nat {
    pageVisits;
  };

  // Statistics
  type Stats = {
    totalRequests : Nat;
    pendingRequests : Nat;
    activePlans : Nat;
    pageVisits : Nat;
  };

  public query ({ caller }) func getStats() : async Stats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view stats");
    };

    let totalRequests = requests.size();

    let pendingRequests = requests.values().toArray().filter(
      func(req) { req.status == #pending }
    ).size();

    let activePlans = mcPlans.values().toArray().filter(
      func(plan) { plan.isActive }
    ).size();

    {
      totalRequests;
      pendingRequests;
      activePlans;
      pageVisits;
    };
  };

  // Invite Links/RSVP System
  let inviteLinksState = InviteLinksModule.initState();

  public shared ({ caller }) func generateInviteCode() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can generate invite codes");
    };
    let blob = await Random.blob();
    let code = InviteLinksModule.generateUUID(blob);
    InviteLinksModule.generateInviteCode(inviteLinksState, code);
    code;
  };

  public func submitRSVP(name : Text, attending : Bool, inviteCode : Text) : async () {
    InviteLinksModule.submitRSVP(inviteLinksState, name, attending, inviteCode);
  };

  public query ({ caller }) func getAllRSVPs() : async [InviteLinksModule.RSVP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    InviteLinksModule.getAllRSVPs(inviteLinksState);
  };

  public query ({ caller }) func getInviteCodes() : async [InviteLinksModule.InviteCode] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view invite codes");
    };
    InviteLinksModule.getInviteCodes(inviteLinksState);
  };
};
