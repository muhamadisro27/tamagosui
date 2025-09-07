module 0x0::guild;

use std::string::String;
use std::vector;
use sui::transfer;
use sui::tx_context;
use sui::types;

const E_NOT_ADMIN: u64 = 101;
const E_PET_ALREADY_EXIST: u64 = 102;
const E_PET_NOT_EXIST: u64 = 103;
const E_INVALID_ONE_TIME_WITNESS: u64 = 104;
const E_INDEX_OVERFLOW: u64 = 201;

public struct GUILD has drop {}

public struct Guild has key {
    id: UID,
    name: String,
    pet_ids: vector<ID>
}

public struct GuildRegistry has key {
    id: UID,
    guild_ids: vector<ID>,
}

public struct AdminCap has key {
    id: UID
}

public fun id(self: &Guild): ID {
    self.id.to_inner()
}

entry fun create_guild(self: &mut GuildRegistry, name: String, _admin_cap: &AdminCap, ctx: &mut TxContext) {
    let guild = Guild {
        id : object::new(ctx),
        name,
        pet_ids: vector::empty<ID>(),
    };

    self.guild_ids.push_back(guild.id());

    transfer::share_object(guild);
}

entry fun store_pet_to_guild(self: &mut Guild, pet_id: ID) {
    assert!(!self.pet_ids.contains(&pet_id), E_PET_ALREADY_EXIST);

    self.pet_ids.push_back(pet_id);
}

entry fun remove_pet_from_guild(self: &mut Guild, pet_id: ID) {
    assert!(self.pet_ids.contains(&pet_id), E_PET_NOT_EXIST);

    let idx = index_of(&self.pet_ids, &pet_id);

    let _removed = remove_at(&mut self.pet_ids, idx);
}

fun init(witness: GUILD, ctx: &mut TxContext) {
    let admin_cap = AdminCap {
        id: object::new(ctx)
    };

    initiate_guild_registry(witness, ctx);

    transfer::transfer(
        admin_cap,
        tx_context::sender(ctx)
    );
}

fun initiate_guild_registry(witness: GUILD, ctx: &mut TxContext) {
    assert!(types::is_one_time_witness(&witness), E_INVALID_ONE_TIME_WITNESS);

    let guild_registry = GuildRegistry {
        id: object::new(ctx),
        guild_ids: vector::empty(),
    };

    transfer::share_object(guild_registry)
}

fun remove_at(v: &mut vector<ID>, idx: u64): ID {
    let len = vector::length(v);
    assert!(idx < len, E_INDEX_OVERFLOW);

    let mut i = idx;
    while (i < len - 1) {
        let next = v[i + 1];
        *vector::borrow_mut(v, i) = next;
        i = i + 1;
    };

    vector::pop_back(v)
}

fun index_of(v: &vector<ID>, target: &ID): u64 {
    let len = vector::length(v);
    let mut i = 0;
    while (i < len) {
        if (v[i] == *target) {
            return i
        };
        i = i + 1;
    };
    len
}

#[test_only]
use sui::test_scenario;

#[test]
fun test_init_guild() {
    let admin = @0xa11;

    let mut scenario = test_scenario::begin(admin);
    {
        let otw = GUILD{};

        init(otw, test_scenario::ctx(&mut scenario));
    };

    test_scenario::next_tx(&mut scenario, admin);
    {
        let guild_registry = scenario.take_shared<GuildRegistry>();
        assert!(guild_registry.guild_ids.is_empty());

        test_scenario::return_shared(guild_registry);
    };

    test_scenario::end(scenario);
}
